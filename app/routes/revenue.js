/** @format */

const express = require("express");
const {
  getRevenueIntervalSixMonth,
  getRevenueInMonth,
  getRevenueAllWeekInYear,
  getRevenueMonthOfYear,
} = require("../controllers/revenue");
const router = express.Router();
const { verifyToken } = require("../authentication/auth");

router.get("/interval-six-month", verifyToken, getRevenueIntervalSixMonth);
router.get("/day-in-month", verifyToken, getRevenueInMonth);
router.get("/all-week-in-year", verifyToken, getRevenueAllWeekInYear);
router.get("/all-month-of-year", verifyToken, getRevenueMonthOfYear);

module.exports = router;
