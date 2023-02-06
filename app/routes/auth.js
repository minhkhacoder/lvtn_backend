/** @format */

const express = require("express");
const { login, signup, getAllAccounts } = require("../controllers/auth");
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/get-all-accounts", getAllAccounts);

module.exports = router;
