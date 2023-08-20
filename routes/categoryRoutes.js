const router = require("express").Router();
const  {
    deleteAll,
    deleteCategory,
    updateCategory,
    getAllCategories,
    addCategory,
    getCategory
} = require("../controllers/categoryController");
//for Category

router.route("/").post(addCategory);
router.route("/:category/:SubCategoryName").get(getCategory);
router.route("/delete/:category/:SubCategoryName").put(deleteCategory);
router.route("/truncate").delete(deleteAll);
router.route("/:category/:SubCategoryName").put(updateCategory);
router.route("/").get(getAllCategories);

module.exports = router;