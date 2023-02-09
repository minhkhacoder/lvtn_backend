/** @format */

const express = require("express");
const { createSeller } = require("../controllers/seller");
const router = express.Router();

router.post("/create", createSeller);

module.exports = router;
