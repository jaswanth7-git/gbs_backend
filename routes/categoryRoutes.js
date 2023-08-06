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
router.route("/:category").get(getCategory);
router.route("/delete/:category").put(deleteCategory);
router.route("/truncate").delete(deleteAll);
router.route("/:category").put(updateCategory);
router.route("/").get(getAllCategories);

module.exports = router;