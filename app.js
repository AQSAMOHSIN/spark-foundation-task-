const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const connectDb = require("./Db/connection");
const transactions = require("./router/transactions");
const customers = require("./router/customers");
require("dotenv").config();

app.use(express.static("./client"));
app.use(express.json());
app.use("/api/v1/transactions", transactions);
app.use("/api/v1/customers", customers);

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

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const start = async () => {
  await connectDb(process.env.mongo_db);
  app.listen(PORT, (req, res) => {
    console.log("running server ...");
  });
};

start();
