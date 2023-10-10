const router = require("express").Router();
const {
  addCustomer,
  getCustomerByName,
  deleteCustomer,
  updateCustomer,
  getAll,
  getCustomerByPhone,
} = require("../controllers/customerController");

router.route("/").post(addCustomer);
router.route("/:customerName").get(getCustomerByName);
router.route("/:CustomerID").put(updateCustomer);
router.route("/phone/:phone").get(getCustomerByPhone);
router.route("/:CustomerID").delete(deleteCustomer);
router.route("/:CustomerID").get(getCustomerBasedOnID)
router.route("/").get(getAll);
module.exports = router;
