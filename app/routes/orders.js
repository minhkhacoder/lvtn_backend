/** @format */

const express = require("express");
const router = express.Router();
const { verifyToken } = require("../authentication/auth");
const {
  createOrder,
  getAllOrderByAccountId,
  getAllOrderBySellerId,
  getAllOrderById,
  updateStatusOrder,
} = require("../controllers/orders");

router.post("/create", verifyToken, createOrder);
router.get("/all", verifyToken, getAllOrderByAccountId);
router.get("/seller/all", verifyToken, getAllOrderBySellerId);
router.get("/seller/detail", verifyToken, getAllOrderById);
router.put("/seller/update-status", verifyToken, updateStatusOrder);

module.exports = router;
