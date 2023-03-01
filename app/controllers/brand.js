/** @format */

const Brand = require("../models/brand");

const brand = new Brand();

const getAllBrand = async (req, res) => {
  try {
    const results = await brand.getAllBrand();
    if (results?.length > 0) {
      res.status(201).json({
        success: true,
        data: results,
      });
    } else {
      res.status(201).json({
        success: false,
        message: "Brand can't find",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createBrand = async (req, res) => {
  try {
    const { name } = req.body;
    await brand.createBrand(name);
    res.status(201).json({
      success: true,
      message: "Add brand successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Brand name already exists!",
    });
  }
};

module.exports = {
  getAllBrand,
  createBrand,
};
