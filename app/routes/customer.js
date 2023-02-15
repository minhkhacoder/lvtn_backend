/** @format */

const express = require("express");
const { verifyToken } = require("../authentication/auth");
const { updateCustomer } = require("../controllers/customer");
const router = express.Router();

router.put("/update", verifyToken, updateCustomer);

module.exports = router;
