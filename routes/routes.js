const router = require("express").Router();
const {getProducts, addProduct, getAllProducts, updateProduct, deleteAll, deleteProduct} = require("../controllers/productController")

// For Products
router.route("/:category").get(getProducts);
router.route("/").get(getAllProducts)
router.route("/:category").post(addProduct);
router.route("/:HSNCode").put(updateProduct);
router.route("/").delete(deleteAll);
router.route("/delete/:HSNCode").put(deleteProduct)

module.exports = router;
