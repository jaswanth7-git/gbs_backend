const {
  addUser,
  getUserByBranch,
  getAllUsers,
} = require("../controllers/userController");
const router = require("express").Router();
const checkAdminRole = require("../middleware/checkAdminRole");

//routes
router.route("/").post(addUser);
router.route("/:branch").get(checkAdminRole, getUserByBranch);
router.route("/").get(checkAdminRole, getAllUsers);

module.exports = router;
