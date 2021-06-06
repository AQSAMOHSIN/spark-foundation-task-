const mysql = require("mysql");
const dotenv = require("dotenv");

let instance = null;
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("db " + connection.state);
});

class dbservice {
  static getDbServiceInstance() {
    return instance ? instance : new dbservice();
  }

  async getAllData(table) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${table}`;

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async insertNewTransaction(
    sender_Account_No,
    sender_name,
    receiver_Account_No,
    receiver_name,
    amount_transfer
  ) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO transaction (sender_Account_No,sender_name,receiver_Account_No,receiver_name,amount_transfer) VALUES (?,?,?,?,?);";
        connection.query(
          query,
          [
            sender_Account_No,
            sender_name,
            receiver_Account_No,
            receiver_name,
            amount_transfer,
          ],
          (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result);
          }
        );
      });

      return {
        sender_Account_No,
        sender_name,
        receiver_Account_No,
        receiver_name,
        amount_transfer,
      };
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteRowById(id) {
    try {
      const account_number = id;
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM customers WHERE account_number = ?";

        connection.query(query, [account_number], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        });
      });

      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async updateBalanceById(
    sender_Account_No,
    receiver_Account_No,
    receiver_newBalance,
    sender_newBalance
  ) {
    try {
      // ///deducting money ///

      const response = await new Promise((resolve, reject) => {
        const query =
          "UPDATE customers SET balance = ? WHERE account_number = ?";
        connection.query(
          query,
          [sender_newBalance, sender_Account_No],
          (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result.affectedRows);
          }
        );
      });
      // ///increasing money ///
      const response2 = await new Promise((resolve, reject) => {
        const query =
          "UPDATE customers SET balance = ? WHERE account_number = ?";
        connection.query(
          query,
          [receiver_newBalance, receiver_Account_No],
          (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result.affectedRows);
          }
        );
      });

      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async searchByName(name) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM customers WHERE name like "${name}%"`;
        console.log(query);
        connection.query(query, [name], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = dbservice;
