/** @format */

const express = require("express");
const {
  login,
  signup,
  getAllAccounts,
  updatePasswordAccount,
} = require("../controllers/auth");
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/get-all", getAllAccounts);
router.put("/update-password", updatePasswordAccount);

module.exports = router;
