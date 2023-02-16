/** @format */

const express = require("express");
const { verifyToken } = require("../authentication/auth");
const {
  createSeller,
  updateInfoSeller,
  login,
} = require("../controllers/seller");
const router = express.Router();

router.post("/create", verifyToken, createSeller);
router.post("/login", login);
router.put("/update-info", verifyToken, updateInfoSeller);

module.exports = router;
