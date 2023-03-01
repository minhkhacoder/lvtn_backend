/** @format */

const Category = require("../models/category");

const category = new Category();

const getAllCategory = async (req, res) => {
  try {
    const results = await category.getAllCategory();
    const categoryParent = results.filter((cat) => cat.cat_parent === null);

    const data = categoryParent.map((cate) => ({
      cat_id: cate.cat_id,
      cat_name: cate.cat_name,
      cat_parent: cate.cat_parent,
      childrens: results.filter((child) => child.cat_parent === cate.cat_id),
    }));

    res.status(201).json({
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
  getAllCategory,
};
