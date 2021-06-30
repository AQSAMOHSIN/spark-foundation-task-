const transactions = require("../modals/transactions");
const getAllTransactions = async (req, res) => {
  try {
    const transactionsData = await transactions.find({});
    res.status(200).json(transactionsData);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const createTransaction = async (req, res) => {
  try {
    const result = await transactions.create(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

module.exports = { getAllTransactions, createTransaction };
