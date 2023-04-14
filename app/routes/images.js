/** @format */

const express = require("express");
const { imageDeleted } = require("../controllers/images");
const { verifyToken } = require("../authentication/auth");
const router = express.Router();

router.delete("/delete", verifyToken, imageDeleted);

module.exports = router;
