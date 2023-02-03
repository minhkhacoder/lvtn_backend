/** @format */

const express = require("express");
const { login } = require("../controllers/auth");
const router = express.Router();

router.get("/", login);

module.exports = router;
