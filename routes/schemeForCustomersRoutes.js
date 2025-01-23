const {
  getAllSchemes,
  addSchemes,
  getSchemeByNumber,
  getTotalSchemeAmountByCustomerId,
  addSchemesByCustomerId
} = require("../controllers/schemeForCustomersController");

const router = require("express").Router();

router.route("/").get(getAllSchemes);
router.route("/").post(addSchemes);
router.route("/:MobileNumber").get(getSchemeByNumber);
router.route("/total/:customerId").get(getTotalSchemeAmountByCustomerId);
router.route("/customer/:customerId").post(addSchemesByCustomerId);
module.exports = router;
