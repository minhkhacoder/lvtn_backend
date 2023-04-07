/** @format */

const express = require("express");
const router = express.Router();
const { verifyToken } = require("../authentication/auth");
const {
  createOrder,
  getAllOrderByAccountId,
} = require("../controllers/orders");

router.post("/create", verifyToken, createOrder);
router.get("/all", verifyToken, getAllOrderByAccountId);

module.exports = router;
