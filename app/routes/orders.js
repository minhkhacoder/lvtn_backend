/** @format */

const express = require("express");
const router = express.Router();
const { verifyToken } = require("../authentication/auth");
const {
  createOrder,
  getAllOrderByAccountId,
  getAllOrderBySellerId,
  updateStatusOrder,
  getOrderDetailById,
  getOrderFilter,
  getAllOrderStatusBySellerId,
} = require("../controllers/orders");

router.post("/create", verifyToken, createOrder);
router.get("/all", verifyToken, getAllOrderByAccountId);
router.get("/seller/all", verifyToken, getAllOrderBySellerId);
router.get("/seller/filter", verifyToken, getOrderFilter);
router.get("/seller/detail", verifyToken, getOrderDetailById);
router.put("/seller/update-status", verifyToken, updateStatusOrder);
router.get("/seller/status", verifyToken, getAllOrderStatusBySellerId);

module.exports = router;
