import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "./context";
import axios from "axios";

const Sidebar = () => {
  const {
    fetchCustomers,
    isSidebarOpen,
    closeSidebar,
    singleCustomer,
    allCustomersData,
    fetchtransaction,
  } = useGlobalContext();
  const { _id, account_number, balance, name, email } = singleCustomer;
  const [amount_transfer, setamount_transfer] = useState(0);
  const [receiver_name, setreceiver_name] = useState("choose the receiver");

  const fetch = () => {
    return new Promise((resolve, reject) => {
      allCustomersData.map((e) => {
        if (e.name === receiver_name) {
          resolve(e);
        }
        return e;
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (receiver_name === "choose the receiver") {
      alert("kindly choose correct receiver ");
    } else {
      if (amount_transfer > balance || 0 > balance) {
        alert("Sorry ;( you don't have enough amount ");
      } else {
        const receiver = await fetch();
        const receiver_Account_No = receiver.account_number;
        const sender_name = name;
        const sender_Account_No = account_number;
        const receiver_balance = receiver.balance;
        const sender_balance = balance;

        const ans = {
          sender_Account_No,
          sender_name,
          receiver_Account_No,
          receiver_name,
          amount_transfer,
        };

        await axios.post("http://localhost:5000/api/v1/transactions", ans);
        fetchtransaction();

        updateBalance(
          receiver,
          amount_transfer,
          receiver_balance,
          sender_balance
        );
        alert("amount tranfered");
        fetchCustomers();
        closeSidebar();
      }
    }
  };

  const updateBalance = async (
    receiver,
    amount_transfer,
    receiver_balance,
    sender_balance
  ) => {
    const receiver_newBalance =
      parseInt(receiver_balance, 10) + parseInt(amount_transfer, 10);
    const sender_newBalance = sender_balance - amount_transfer;

    await axios.patch(
      `http://localhost:5000/api/v1/customers/${receiver._id}`,
      { balance: receiver_newBalance }
    );
    await axios.patch(`http://localhost:5000/api/v1/customers/${_id}`, {
      balance: sender_newBalance,
    });
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "sidebar-wrapper show" : "sidebar-wrapper"
      }`}
    >
      <aside className="sidebar">
        <button className="close-btn" onClick={closeSidebar}>
          <FaTimes />
        </button>
        <div className="sidebar-links">
          <h2>transfer Money</h2>
          <h3>from:</h3>
          <h4>NAME:{name}</h4>
          <h4>EMAIL:{email}</h4>
          <h4>BALANCE:{balance}</h4>
        </div>
        <hr />
        <div>
          <form className="money_transfer" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="money_tranfer_to">
              <h3 style={{ display: "inline-block" }}>TO:</h3>
            </label>
            <select
              name="money_tranfer_to"
              id="money_tranfer_to"
              value={receiver_name}
              onChange={(e) => setreceiver_name(e.target.value)}
            >
              {allCustomersData.map((e) => {
                const { account_number, name } = e;
                if (e.name !== singleCustomer.name) {
                  return (
                    <option key={account_number} value={name}>
                      {name}
                    </option>
                  );
                } else {
                  return (
                    <option key={account_number}>choose the receiver</option>
                  );
                }
              })}
            </select>
            <br />
            <label htmlFor="amount_transfer" className="amount_transfer">
              ENTER AMOUNT :
            </label>
            <input
              value={amount_transfer}
              onChange={(e) => setamount_transfer(e.target.value)}
              name="amount_transfer"
              className="amount_transfer"
              type="number"
            />
            <br />
            <button
              type="submit"
              className="btn transferBtn"
              onClick={(e) => handleSubmit(e)}
            >
              TRANSFER
            </button>
          </form>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
