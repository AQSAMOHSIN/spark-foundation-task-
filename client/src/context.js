import React, { useState, useContext } from "react";

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

  return (
    <AppContext.Provider
      value={{
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
