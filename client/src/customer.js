import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "./context";
import { FcUpLeft } from "react-icons/fc";
const Person = () => {
  const [customer, setCustomer] = useState({});
  const { name } = useParams();
  const { openSidebar, allCustomersData } = useGlobalContext();

  const fetchCustomer = () => {
    const newcus = allCustomersData.find((cus) => cus.name === name);
    setCustomer(newcus);
  };

  useEffect(() => {
    fetchCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCustomersData]);

  return (
    <div className="single-customer-container">
      <div className="single-customer">
        <div className="customer-main ">
          <Link to="/customers">
            <div className="back">
              <FcUpLeft />
              Back To Customers
            </div>
          </Link>
          <img
            src={`//joeschmoe.io/api/v1/${customer.name}`}
            alt="avatar"
          ></img>
          <h3>NAME:{customer.name}</h3>
        </div>

        <div className="info">
          <p>
            Account Number:{customer.account_number}
            <br />
            Amount:{customer.balance}
            <br />
            Email:{customer.email}
          </p>

          <br />
          <button className="btn" onClick={() => openSidebar(customer)}>
            Transfer Money
          </button>
        </div>
      </div>
    </div>
  );
};

export default Person;
