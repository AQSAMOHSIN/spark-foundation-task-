const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const dbserver = require("./dbservice");

app.use(express.static("./client"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/getAll", (req, res) => {
  const db = dbserver.getDbServiceInstance();
  const ans = db.getAllData("customers");
  ans
    .then((data) => res.json({ success: true, data }))
    .catch((err) => console.log("this is from app.js error ", err));
});

app.get("/getAllT", (req, res) => {
  const db = dbserver.getDbServiceInstance();
  const ans = db.getAllData("transaction");
  ans
    .then((data) => res.json({ success: true, data }))
    .catch((err) => console.log("this is from app.js error ", err));
});

app.post("/putdata", (request, response) => {
  const {
    sender_Account_No,
    sender_name,
    receiver_Account_No,
    receiver_name,
    amount_transfer,
  } = request.body;
  const db = dbserver.getDbServiceInstance();
  const result = db.insertNewTransaction(
    sender_Account_No,
    sender_name,
    receiver_Account_No,
    receiver_name,
    amount_transfer
  );
  result
    .then((data) => response.json({ success: true, data }))
    .catch((err) => console.log(err));
});

app.delete("/delete/:id", (request, response) => {
  const { id } = request.params;
  const db = dbserver.getDbServiceInstance();
  const result = db.deleteRowById(id);

  result
    .then((data) => response.json({ success: data }))
    .catch((err) => console.log(err));
});

app.patch("/update", (request, response) => {
  const {
    sender_Account_No,
    receiver_Account_No,
    receiver_newBalance,
    sender_newBalance,
  } = request.body;
  const db = dbserver.getDbServiceInstance();
  const result = db.updateBalanceById(
    sender_Account_No,
    receiver_Account_No,
    receiver_newBalance,
    sender_newBalance
  );

  result
    .then((data) => response.json({ success: data }))
    .catch((err) => console.log(err));
});

app.get("/search/:name", (request, response) => {
  const { name } = request.params;
  const db = dbserver.getDbServiceInstance();

  const result = db.searchByName(name);

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(PORT, (req, res) => {
  console.log("running server ...");
});
