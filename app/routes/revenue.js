/** @format */

const express = require("express");
const { getRevenueIntervalSixMonth } = require("../controllers/revenue");
const router = express.Router();
const { verifyToken } = require("../authentication/auth");

router.get("/interval-six-month", verifyToken, getRevenueIntervalSixMonth);

module.exports = router;
