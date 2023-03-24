/** @format */

const Shipping = require("../models/shipping");

const shipping = new Shipping();

const getAllShipping = async (req, res) => {
  try {
    const results = await shipping.getAllShipping();
    if (results?.length > 0) {
      res.status(200).json({
        success: true,
        data: results,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Shipping can't find",
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
  getAllShipping,
};
