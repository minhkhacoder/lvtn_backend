/** @format */

const express = require("express");
const { updateCustomer } = require("../controllers/customer");
const router = express.Router();

router.put("/update", updateCustomer);

module.exports = router;
