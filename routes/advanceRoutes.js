const {
  addAdvanceAmount,
  getAdvanceAmountByCustomerNumber,
  updateAdvanceAmount,
  getAllAdvanceAmounts,
  getTotalAdvanceAmountByCustomerId,
} = require("../controllers/advanceContoller");

const router = require("express").Router();

router.route("/:phone").post(addAdvanceAmount);
router.route("/:phone").get(getAdvanceAmountByCustomerNumber);
router.route("/").get(getAllAdvanceAmounts);
router.route("/update").put(updateAdvanceAmount);
router.route("/total/:customerId").get(getTotalAdvanceAmountByCustomerId);

module.exports = router;
