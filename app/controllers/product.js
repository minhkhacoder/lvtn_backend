/** @format */

const { uploadAndGetMultiImage } = require("../common/driveAPI");
const Classify = require("../models/classify");
const Images = require("../models/images");
const Product = require("../models/product");

const products = new Product();
const classifies = new Classify();
const images = new Images();

const createProduct = async (req, res) => {
  try {
    let {
      cat_id,
      bra_id,
      seller_id,
      prod_id,
      pro_name,
      pro_desc,
      pro_material,
      pro_price,
      pro_quantity,
      cla_group,
      cla_name,
    } = req.body;
    let { pro_image } = req.files;

    if (!pro_image) {
      return res.status(400).json({
        success: false,
        message: "No image product file was uploaded.",
      });
    }

    const imageProduct = await uploadAndGetMultiImage(
      Array.isArray(pro_image) ? pro_image : [pro_image]
    );

    const result = await products.createProduct({
      cat_id,
      bra_id,
      seller_id,
      prod_id,
      pro_name,
      pro_desc,
      pro_material,
      pro_price: Number(pro_price),
      pro_quantity: Number(pro_quantity),
    });

    if (!result) {
      throw new Error("Created product failed!");
    }

    let flad = false;

    const productId = await products.getProductId(seller_id);

    if (cla_group) {
      cla_group = Array.isArray(cla_group) ? cla_group : [cla_group];
      cla_name = Array.isArray(cla_name) ? cla_name : [cla_name];

      const classifyPromises = cla_group.map((group, i) => {
        const classify = {
          pro_id: productId,
          cla_group: group,
          cla_name: cla_name[i],
        };
        return classifies.createClassify(classify);
      });
      flad = await Promise.all(classifyPromises);
    }

    const imagePromises = imageProduct.map((image) =>
      images.addImage({
        img_url: image.url,
        pro_id: productId,
        img_name: image.name,
      })
    );
    flad = await Promise.all(imagePromises);
    flad
      ? res.status(201).json({
          success: true,
          message: "Created product successfully!",
        })
      : res.status(400).json({
          success: false,
          message: "Created product failed!",
        });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
};
