const router = require("express").Router();
const {
  addCustomer,
  getCustomerByName,
  deleteCustomer,
  updateCustomer,
  getAll,
} = require("../controllers/customerController");

router.route("/").post(addCustomer);
router.route("/:customerName").get(getCustomerByName);
router.route("/:customerName").put(updateCustomer);
router.route("/:customerName").delete(deleteCustomer);
router.route("/").get(getAll);
module.exports = router;
