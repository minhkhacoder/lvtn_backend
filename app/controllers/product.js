/** @format */

const {
  uploadAndGetMultiImage,
  deleteImageInDrive,
} = require("../common/driveAPI");
const Brand = require("../models/brand");
const Category = require("../models/category");
const Classify = require("../models/classify");
const Images = require("../models/images");
const Product = require("../models/product");
const Seller = require("../models/seller");
const Producer = require("../models/producer");
const products = new Product();
const classifies = new Classify();
const images = new Images();
const categories = new Category();
const brands = new Brand();
const sellers = new Seller();
const producers = new Producer();

const createProduct = async (req, res) => {
  try {
    let {
      cat_id,
      bra_id,
      seller_id,
      prod_name,
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

    const resultProducer = await producers.findOneProducerByName(prod_name);

    let producerId = "";
    if (resultProducer === false) {
      const producer = await producers.createProducer(prod_name);
      if (producer === prod_name) {
        producerId = await producers.findOneId(producer);
      }
    } else producerId = resultProducer;

    if (producerId !== "") {
      const result = await products.createProduct({
        cat_id,
        bra_id,
        seller_id,
        producerId,
        pro_name,
        pro_desc,
        pro_material,
        pro_price: Number(pro_price),
        pro_quantity: Number(pro_quantity),
      });

      if (!result) {
        throw new Error("Created product failed!");
      }
    }

    let flad = false;

    const productId = await products.getIdProduct(seller_id);

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

    const imagePromises = imageProduct.map(
      async (image) =>
        await images.addImage({
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

const getProductById = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const result = await products.getProductById(id);
    result
      ? res.status(201).json({
          success: true,
          data: result,
        })
      : res.status(400).json({
          success: false,
          message: "Can't get product!",
        });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      id,
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
    const { pro_image } = req.files;

    const existingProduct = await products.getProductById(id);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    const updatedProduct = {
      cat_id: cat_id || existingProduct.cat_id,
      bra_id: bra_id || existingProduct.bra_id,
      seller_id: seller_id || existingProduct.seller_id,
      prod_id: prod_id || existingProduct.prod_id,
      pro_name: pro_name || existingProduct.pro_name,
      pro_desc: pro_desc || existingProduct.pro_desc,
      pro_material: pro_material || existingProduct.pro_material,
      pro_price: pro_price || existingProduct.pro_price,
      pro_quantity: pro_quantity || existingProduct.pro_quantity,
    };

    const updated = await products.updateProduct(id, updatedProduct);

    if (!updated) {
      throw new Error("Updated product failed!");
    }

    let flag = false;
    const classifyArr = await classifies.getClasifyById(id);

    if (classifyArr && cla_group && cla_name) {
      let groupArr = Array.isArray(cla_group) ? cla_group : [cla_group];
      let nameArr = Array.isArray(cla_name) ? cla_name : [cla_name];

      const classifyPromises = groupArr.map((group, i) => {
        const classify = {
          pro_id: id,
          cla_group: group,
          cla_name: nameArr[i],
          cla_id: classifyArr[i].cla_id,
        };
        return classifies.updateClassify(classify);
      });
      flag = await Promise.all(classifyPromises);
    }

    if (pro_image) {
      const imageProduct = await uploadAndGetMultiImage(
        Array.isArray(pro_image) ? pro_image : [pro_image]
      );

      const imagePromises = imageProduct.map((image) =>
        images.addImage({
          img_url: image.url,
          pro_id: id,
          img_name: image.name,
        })
      );
      flag = await Promise.all(imagePromises);
    }

    flag
      ? res.status(200).json({
          success: true,
          message: "Updated product successfully!",
        })
      : res.status(400).json({
          success: false,
          message: "Updated product failed!",
        });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;

    const classifyArr = await classifies.getClasifyById(id);
    const classifyPromises = classifyArr.map((classify) =>
      classifies.deleteClassify(classify.cla_id)
    );
    const classifyResults = await Promise.allSettled(classifyPromises);

    const imagesArr = await images.getImagesByProductId(id);
    const imagePromises = imagesArr.map((image) => {
      return images.deleteImage(image);
    });

    const imageResults = await Promise.allSettled(imagePromises);
    const drivePromises = imagesArr.map((image) =>
      deleteImageInDrive(image.img_url)
    );

    const driveResults = await Promise.allSettled(drivePromises);

    const failedClassifyResults = classifyResults.filter(
      (result) => result.status === "rejected"
    );

    const failedImageResults = imageResults.filter(
      (result) => result.status === "rejected"
    );

    const failedDriveResults = driveResults.filter(
      (result) => result.status === "rejected"
    );

    if (
      failedClassifyResults.length > 0 ||
      failedImageResults.length > 0 ||
      failedDriveResults.length > 0
    ) {
      res.status(400).json({
        success: false,
        message: "Deleted product failed!",
      });
    } else {
      const productResult = await products.deleteProduct(id);

      productResult
        ? res.status(200).json({
            success: true,
            message: "Deleted product successfully!",
          })
        : res.status(400).json({
            success: false,
            message: "Deleted product failed!",
          });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const results = await products.getAllProducts();

    const data = await results.reduce(async (accPromise, cur) => {
      let categoryPromise = categories.getCategoryById(cur.cat_id);
      let brandPromise = brands.getBrandById(cur.bra_id);
      let sellerPromise = sellers.getSellerById(cur.seller_id);
      let producerPromise = producers.getProducerById(cur.prod_id);

      let [category, brand, seller, producer] = await Promise.all([
        categoryPromise,
        brandPromise,
        sellerPromise,
        producerPromise,
      ]);
      let acc = await accPromise;
      let averageRating;
      if (cur.average_rating === null) {
        averageRating = 0;
      } else {
        averageRating = cur.average_rating;
      }
      acc.push({
        id: cur.pro_id,
        name: cur.pro_name,
        desc: cur.pro_desc,
        material: cur.pro_material,
        price: cur.pro_price,
        category: category[0],
        brand: brand[0],
        producer: producer[0],
        seller: seller[0],
        rat_count: cur.rat_count,
        average_rating: parseInt(averageRating),
        image: cur.img_url,
      });
      return Promise.resolve(acc);
    }, Promise.resolve([]));

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

const getAllProductsBySellerId = async (req, res) => {
  try {
    const { sellerId } = req.query;
    const results = await products.getAllProductsBySellerId(sellerId);

    const data = await results.reduce(async (accPromise, cur) => {
      let categoryPromise = categories.getCategoryById(cur.cat_id);
      let brandPromise = brands.getBrandById(cur.bra_id);
      let sellerPromise = sellers.getSellerById(cur.seller_id);
      let producerPromise = producers.getProducerById(cur.prod_id);

      let [category, brand, seller, producer] = await Promise.all([
        categoryPromise,
        brandPromise,
        sellerPromise,
        producerPromise,
      ]);
      let acc = await accPromise;
      let averageRating;
      if (cur.average_rating === null) {
        averageRating = 0;
      } else {
        averageRating = cur.average_rating;
      }
      acc.push({
        id: cur.pro_id,
        name: cur.pro_name,
        desc: cur.pro_desc,
        material: cur.pro_material,
        price: cur.pro_price,
        category: category[0],
        brand: brand[0],
        producer: producer[0],
        seller: seller[0],
        rat_count: cur.rat_count,
        average_rating: parseInt(averageRating),
        image: cur.img_url,
      });
      return Promise.resolve(acc);
    }, Promise.resolve([]));

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
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllProductsBySellerId,
};
