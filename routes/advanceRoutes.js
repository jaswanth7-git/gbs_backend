const {
  addAdvanceAmount,
  getAdvanceAmountByCustomerNumber,
  updateAdvanceAmount,
  getAllAdvanceAmounts,
  getTotalAdvanceAmountByCustomerId,
  addAdvanceAmountByCustomerId
} = require("../controllers/advanceContoller");

const router = require("express").Router();

router.route("/total/:customerId").get(getTotalAdvanceAmountByCustomerId);
router.route("/phone/:phone").post(addAdvanceAmount);
router.route("/phone/:phone").get(getAdvanceAmountByCustomerNumber); 
router.route("/customer/:customerId").post(addAdvanceAmountByCustomerId);
router.route("/customer/:customerId/total").get(getTotalAdvanceAmountByCustomerId); 
router.route("/").get(getAllAdvanceAmounts);
router.route("/update").put(updateAdvanceAmount);
module.exports = router;
