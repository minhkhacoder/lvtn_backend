/** @format */

const express = require("express");
const { login, signup, updatePasswordAccount } = require("../controllers/auth");
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.put("/update-password", updatePasswordAccount);

module.exports = router;
