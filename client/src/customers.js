import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";

const Customers = () => {
  const { allCustomersData, setAllCustomersData } = useGlobalContext();
  const [customers, setCustomers] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const fetchCustomers = () => {
    fetch("http://localhost:5000/getAll")
      .then((response) => response.json())
      .then((data) => {
        setAllCustomersData(data["data"]);
        return setCustomers(data["data"]);
      });
  };

  const search = () => {
    if (searchValue) {
      fetch("http://localhost:5000/search/" + searchValue)
        .then((response) => response.json())
        .then((data) => setCustomers(data["data"]));
      setSearchValue("");
    }
    if (!searchValue) {
      setCustomers(allCustomersData);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);

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
            <Link
              to={`/customer/${customer.name}`}
              key={customer.account_number}
            >
              <div className="item">
                <h4>
                  {customer.account_number}:{customer.name}
                </h4>
                <h4>{customer.balance}</h4>
              </div>
            </Link>
          );
        })}
      </div>
      );
    </>
  );
};

export default Customers;
