/** @format */

const Category = require("../models/category");

const category = new Category();

const getAllCategory = async (req, res) => {
  try {
    const results = await category.getAllCategory();
    const categoryParent = results.filter((cat) => cat.cat_parent === null);

    const data = categoryParent.map((cate) => ({
      id: cate.cat_id,
      label: cate.cat_name,
      parent: cate.cat_parent,
      childrens: results
        .filter((child) => child.cat_parent === cate.cat_id)
        .map((item) => {
          return {
            id: item.cat_id,
            label: item.cat_name,
            parent: item.cat_parent,
          };
        }),
    }));

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

const getCategoryByParentId = async (req, res) => {
  try {
    const { parentId } = req.query;
    const results = await category.getCategoryByParentId(parentId);
    const data = results.map((item) => {
      return { id: item.cat_id, label: item.cat_name, parent: item.cat_parent };
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
  getAllCategory,
  getCategoryByParentId,
};
