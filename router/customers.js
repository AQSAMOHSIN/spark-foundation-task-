const express = require("express");
const router = express.Router();

const {
  getAllCustomers,
  updateCustomers,
  getSingleCustomer,
} = require("../controllers/customers");
router.route("/").get(getAllCustomers);
router.route("/:id").patch(updateCustomers).get(getSingleCustomer);

module.exports = router;
