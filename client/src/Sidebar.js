import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "./context";

const Sidebar = () => {
  const {
    isSidebarOpen,
    closeSidebar,
    singleCustomer,
    allCustomersData,
    setAllTransactionsFunc,
    setAllCustomersData,
  } = useGlobalContext();
  const { account_number, balance, name, email } = singleCustomer;
  const [amount_transfer, setamount_transfer] = useState(0);
  const [receiver_name, setreceiver_name] = useState("");
  const fetchAllCustomers = () => {
    fetch("http://localhost:5000/getAll")
      .then((response) => response.json())
      .then((data) => setAllCustomersData(data["data"]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (amount_transfer > balance || 0 > balance) {
      alert("Sorry ;( you don't have enough amount ");
    } else {
      const receiver = allCustomersData.find(
        (e) => e.name.toLowerCase() === receiver_name.toLowerCase()
      );
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

      fetch("http://localhost:5000/putdata", {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(ans),
      })
        .then((response) => response.json())
        .then((data) => {
          return setAllTransactionsFunc(data["data"]);
        });
      updateBalance(
        sender_Account_No,
        receiver_Account_No,
        amount_transfer,
        receiver_balance,
        sender_balance
      );
      alert("amount tranfered");
      closeSidebar();
    }
  };

  const updateBalance = (
    sender_Account_No,
    receiver_Account_No,
    amount_transfer,
    receiver_balance,
    sender_balance
  ) => {
    const receiver_newBalance =
      parseInt(receiver_balance, 10) + parseInt(amount_transfer, 10);
    const sender_newBalance = sender_balance - amount_transfer;
    fetch("http://localhost:5000/update", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        sender_Account_No,
        receiver_Account_No,
        receiver_newBalance,
        sender_newBalance,
      }),
    })
      .then((response) => response.json())
      .then(fetchAllCustomers());
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
                  return;
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
