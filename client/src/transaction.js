import React from "react";
import { useGlobalContext } from "./context";
const Transaction = () => {
  const { allTransactions } = useGlobalContext();

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
              const { sender_Account_No, receiver_name, amount_transfer } =
                transaction;

              return (
                <tr key={index} className="items">
                  <td>{index + 1}</td>
                  <td>{transaction.sender_name}</td>
                  <td>{sender_Account_No}</td>
                  <td>{receiver_name}</td>
                  <td>{transaction.receiver_Account_No}</td>
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
