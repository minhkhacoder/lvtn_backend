/** @format */

const Payment = require("../models/payment");

const payment = new Payment();

const getAllPayment = async (req, res) => {
  try {
    const results = await payment.getAllPayment();
    if (results?.length > 0) {
      res.status(200).json({
        success: true,
        data: results,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Payment can't find",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllPayment,
};
