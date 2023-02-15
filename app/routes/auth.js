/** @format */

const express = require("express");
const { verifyToken } = require("../authentication/auth");
const { login, signup, updatePasswordAccount } = require("../controllers/auth");
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.put("/update-password", verifyToken, updatePasswordAccount);

module.exports = router;
