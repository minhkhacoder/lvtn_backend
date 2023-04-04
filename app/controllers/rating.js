/** @format */

const Rating = require("../models/rating");

const rating = new Rating();

const getAllRatingByProductId = async (req, res) => {
  try {
    const { proId } = req.query;
    const results = await rating.getAllRatingByProductId(proId);
    const data = results.map((item) => {
      return {
        id: item.rat_id,
        desc: item.rat_desc,
        point: item.rat_point,
        createdAt: item.rat_timeCreated,
        customer: item.cus_userName,
      };
    });
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllRatingByProductId,
};
