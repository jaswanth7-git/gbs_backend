const { addCustomizedOrder, getOrderByModelNumber, getCustomizedOrder, getAllOrders } = require("../controllers/customizedOrdersController");

const router = require("express").Router();

router.route("/").post(addCustomizedOrder);
router.route("/:modelNumber").get(getOrderByModelNumber);
router.route("/deliveryDate/:deliveryDate").get(getCustomizedOrder);
router.route("/").get(getAllOrders);

module.exports = router;