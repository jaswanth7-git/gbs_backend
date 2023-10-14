const {
  addSales,
  getSalesDataByHUID,
  getAllSalesData,
  getSalesBySalesID,
} = require("../controllers/salesController");

const router = require("express").Router();

router.route("/").post(addSales);
router.route("/:HUID").get(getSalesDataByHUID);
router.route("/").get(getAllSalesData);
router.route("/SalesID/:SalesID").get(getSalesBySalesID);

module.exports = router;
