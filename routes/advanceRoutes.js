const {
  addAdvanceAmount,
  getAdvanceAmountByCustomerNumber,
} = require("../controllers/advanceContoller");

const router = require("express").Router();

router.route("/:phone").post(addAdvanceAmount);
router.route("/:phone").get(getAdvanceAmountByCustomerNumber);
router.route("/").get(getAllAdvanceAmounts);
router.route("/:phone").put(updateAdvanceAmount)

module.exports = router;
