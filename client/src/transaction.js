import React, { useEffect } from "react";
import { useGlobalContext } from "./context";
const Transaction = () => {
  const { allTransactions, setAllTransactions } = useGlobalContext();

  const fetchtransaction = () => {
    fetch("http://localhost:5000/getAllT")
      .then((response) => response.json())
      .then((data) => setAllTransactions(data["data"]));
  };

  useEffect(() => {
    fetchtransaction();
  }, []);

  return (
    <>
      <div className="transaction cover">
        <h2>TRANSACTIONS#</h2>

        <table className="table">
          <thead>
            <tr className="thead">
              <td>S.NO.</td>
              <td>Sender Name</td>
              <td>Sender A/N</td>
              <td>Receiver Name </td>
              <td>Receiver A/N</td>
              <td>balance</td>
            </tr>
          </thead>
          <tbody>
            {allTransactions.map((transaction, index) => {
              const {
                Sender_name,
                sender_Account_No,
                receiver_name,
                receiver_Account_NO,
                amount_transfer,
              } = transaction;

              return (
                <tr key={index} className="items">
                  <td>{index + 1}</td>
                  <td>{Sender_name}</td>
                  <td>{sender_Account_No}</td>
                  <td>{receiver_name}</td>
                  <td>{receiver_Account_NO}</td>
                  <td>{amount_transfer}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Transaction;
