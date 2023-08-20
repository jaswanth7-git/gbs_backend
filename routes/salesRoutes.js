const {
  addSales,
  getSalesByCustomerName,
} = require("../controllers/salesController");

const router = require("express").Router();

router.route("/:customerName").post(addSales);
router.route("/:customerName").get(getSalesByCustomerName);

module.exports = router;
