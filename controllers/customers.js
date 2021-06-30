const customerSchema = require("../modals/customers");

const getAllCustomers = async (req, res) => {
  try {
    const data = await customerSchema.find({});
    res.status(200).json(data);
  } catch (err) {
    res.json({ msg: err });
  }
};

const updateCustomers = async (req, res) => {
  try {
    const { id: customerId } = req.params;
    const data = await customerSchema.findOneAndUpdate(
      { _id: customerId },
      req.body,
      { new: true }
    );
    res.status(200).json(data);
  } catch (err) {
    res.json({ msg: err });
  }
};

const getSingleCustomer = async (req, res) => {
  try {
    const { id: customerId } = req.params;
    const data = await customerSchema.findOne({ _id: customerId });
    res.status(200).json(data);
  } catch (err) {
    res.json({ msg: err });
  }
};

module.exports = {
  getAllCustomers,
  updateCustomers,
  getSingleCustomer,
};
