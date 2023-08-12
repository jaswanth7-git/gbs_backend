const {
  addUser,
  getUserByBranch,
  getAllUsers,
} = require("../controllers/userController");
const router = require("express").Router();

//routes
router.route("/").post(addUser);
router.route("/:branch").get(getUserByBranch);

module.exports = router;
