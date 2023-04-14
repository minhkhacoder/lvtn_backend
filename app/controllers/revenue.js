/** @format */

const Revenue = require("../models/revenue");
const revenues = new Revenue();
const getRevenueIntervalSixMonth = async (req, res) => {
  try {
    const { sellerId } = req.query;
    const results = await revenues.getRevenueIntervalSixMonth(sellerId);
    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getRevenueIntervalSixMonth,
};
