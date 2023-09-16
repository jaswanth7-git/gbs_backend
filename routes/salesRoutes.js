const {
  addSales,
  getSalesDataByHUID,
  getAllSalesData,
} = require("../controllers/salesController");

const router = require("express").Router();

router.route("/").post(addSales);
router.route("/:HUID").get(getSalesDataByHUID);
router.route("/").get(getAllSalesData);

module.exports = router;
