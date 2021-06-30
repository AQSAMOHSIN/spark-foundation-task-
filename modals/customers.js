const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  account_number: String,
  name: String,
  email: String,
  balance: Number,
});

module.exports = mongoose.model("customers", customerSchema);
