import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";
const Customers = () => {
  const { allCustomersData } = useGlobalContext();
  const [customers, setCustomers] = useState(allCustomersData);
  const [searchValue, setSearchValue] = useState("");

  const search = () => {
    if (searchValue) {
      const newcus = allCustomersData.filter((cus) => {
        return cus.name.toLowerCase().startsWith(searchValue.toLowerCase());
      });
      setCustomers(newcus);
      setSearchValue("");
    }
    if (!searchValue) {
      setCustomers(allCustomersData);
    }
  };

  useEffect(() => {
    setCustomers(allCustomersData);
  }, [allCustomersData]);

  return (
    <>
      <div className="customers cover">
        <h2>CUSTOMERS#</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            className="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Searh by name"
          />
          <button type="button" className="btn" onClick={search}>
            search
          </button>
        </form>

        {customers.map((customer) => {
          return (
            <div key={customer._id}>
              <Link to={`/customer/${customer.name}`}>
                <div className="item">
                  <h4>
                    {customer.account_number}:{customer.name}
                  </h4>
                  <h4>{customer.balance}</h4>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      );
    </>
  );
};

export default Customers;
