/** @format */

const express = require("express");
const { getAllRatingByProductId } = require("../controllers/rating");
const router = express.Router();

router.get("/", getAllRatingByProductId);

module.exports = router;
