/** @format */

const express = require("express");
const { getAllShipping } = require("../controllers/shipping");
const router = express.Router();

router.get("/all", getAllShipping);

module.exports = router;
