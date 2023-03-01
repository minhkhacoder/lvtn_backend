/** @format */

const express = require("express");
const { getAllBrand, createBrand } = require("../controllers/brand");
const router = express.Router();
const { verifyToken } = require("../authentication/auth");

router.get("/all", getAllBrand);
router.post("/create", verifyToken, createBrand);

module.exports = router;
