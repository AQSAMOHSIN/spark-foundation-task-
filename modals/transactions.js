const mongoose = require("mongoose");

const transactionsSchema = new mongoose.Schema({
  sender_Account_No: String,
  sender_name: String,
  receiver_Account_No: String,
  receiver_name: String,
  amount_transfer: Number,
});

module.exports = mongoose.model("transactions", transactionsSchema);
