import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [singleCustomer, setSingleCustomer] = useState({});
  const [allCustomersData, setAllCustomersData] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const setAllTransactionsFunc = (transaction) => {
    setAllTransactions([...allTransactions, transaction]);
  };
  const openSidebar = (customer) => {
    setSingleCustomer(customer);
    return setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    return setIsSidebarOpen(false);
  };
  const openSubmenu = () => {
    return setIsSubmenuOpen(true);
  };
  const closeSubmenu = () => {
    return setIsSubmenuOpen(false);
  };

  const fetchCustomers = async () => {
    const response = await axios("http://localhost:5000/api/v1/customers");
    const data = response.data;
    setAllCustomersData(data);
  };

  const fetchtransaction = async () => {
    const response = await axios("http://localhost:5000/api/v1/transactions");
    const data = response.data;
    setAllTransactions(data);
  };

  useEffect(() => {
    fetchCustomers();
    fetchtransaction();
  }, [allCustomersData]);

  return (
    <AppContext.Provider
      value={{
        fetchCustomers,
        fetchtransaction,
        openSidebar,
        closeSidebar,
        openSubmenu,
        closeSubmenu,
        isSidebarOpen,
        isSubmenuOpen,
        singleCustomer,
        setAllCustomersData,
        allCustomersData,
        allTransactions,
        setAllTransactionsFunc,
        setAllTransactions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
