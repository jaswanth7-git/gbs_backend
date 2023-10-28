const { addCustomizedOrder, getOrderByModelNumber, getCustomizedOrder, getAllOrders, deleteByModelNumber, getBasedOnName } = require("../controllers/customizedOrdersController");

const router = require("express").Router();

router.route("/").post(addCustomizedOrder);
router.route("/:modelNumber").get(getOrderByModelNumber);
router.route("/deliveryDate/:deliveryDate").get(getCustomizedOrder);
router.route("/").get(getAllOrders);
router.route("/delete/:modelNumber").delete(deleteByModelNumber)
router.route("/itemName/:itemName").get(getBasedOnName)

module.exports = router;