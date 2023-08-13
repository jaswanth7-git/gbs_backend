const router = require("express").Router();
const {
    addCustomer,
    getCustomerByName,
    deleteCustomer,
    updateCustomer,
  } = require("../controllers/customerController");

  router.route("/").post(addCustomer);
  router.route("/:customerName").get(getCustomerByName);
  router.route("/:customerName").put(updateCustomer);
  router.route("/:customerName").delete(deleteCustomer);

  module.exports = router;