const {
  getAllSchemes,
  addSchemes,
  getSchemeByNumber,
  getTotalSchemeAmountByCustomerId
} = require("../controllers/schemeForCustomersController");

const router = require("express").Router();

router.route("/").get(getAllSchemes);
router.route("/").post(addSchemes);
router.route("/:MobileNumber").get(getSchemeByNumber);
router.route("/total/:customerId").get(getTotalSchemeAmountByCustomerId);
module.exports = router;
