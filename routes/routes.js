const router = require("express").Router();
const {
  getProducts,
  addProduct,
  getAllProducts,
  updateProduct,
  deleteAll,
  deleteProduct,
  getProductByBarcode,
} = require("../controllers/productController");

// For Products
router.route("/:category/:SubCategoryName").get(getProducts);
router.route("/").get(getAllProducts);
router.route("/").post(addProduct); 
// router.route("/:category/:SubCategoryName").post(addProduct);
router.route("/:HSNCode/:HUID").put(updateProduct);
router.route("/").delete(deleteAll);
router.route("/delete/:HSNCode/:HUID").put(deleteProduct);
router.route("/:barCode").get(getProductByBarcode);
module.exports = router;
