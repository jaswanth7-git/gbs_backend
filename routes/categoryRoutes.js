const router = require("express").Router();
const  {
    deleteAll,
    deleteCategory,
    updateCategory,
    getAllCategories,
    addCategory,
    getCategory,
    getCategoryByID,
    getAllSubCategories
} = require("../controllers/categoryController");
//for Category

router.route("/").post(addCategory);
router.route("/:category/:SubCategoryName").get(getCategory);
router.route("/delete/").put(deleteCategory);
router.route("/truncate").delete(deleteAll);
router.route("/:category/:SubCategoryName").put(updateCategory);
router.route("/").get(getAllCategories);
router.route("/:CategoryID").get(getCategoryByID);
router.route("/subcategories").post(getAllSubCategories);
module.exports = router;