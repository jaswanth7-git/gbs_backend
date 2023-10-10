const {
  getAllSchemes,
  addSchemes,
  getSchemeByNumber,
} = require("../controllers/schemeForCustomersController");

const router = require("express").Router();

router.route("/").get(getAllSchemes);
router.route("/").post(addSchemes);
router.route("/:MobileNumber").get(getSchemeByNumber);
module.exports = router;
