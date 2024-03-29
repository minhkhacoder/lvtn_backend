/** @format */

const Search = require("../models/search");
const search = new Search();
const Brand = require("../models/brand");
const Category = require("../models/category");
const Seller = require("../models/seller");
const Producer = require("../models/producer");
const categories = new Category();
const brands = new Brand();
const sellers = new Seller();
const producers = new Producer();
const getAllProductByCategory = async (req, res) => {
  try {
    const { catId } = req.query;
    const results = await search.getAllProductByCategory(catId);
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
      const exist = acc.find((item) => item.id === cur.pro_id);

      if (!exist) {
        acc.push({
          id: cur.pro_id,
          name: cur.pro_name,
          desc: cur.pro_desc,
          material: cur.pro_material,
          price: cur.pro_price,
          category: {
            id: category[0].cat_id,
            label: category[0].cat_name,
            parent: category[0].cat_parent,
          },
          brand: { id: brand[0].bra_id, label: brand[0].bra_name },
          producer: producer[0],
          seller: seller[0],
          rat_count: cur.rat_count,
          average_rating: parseInt(averageRating),
          image: [cur.img_url],
        });
      } else {
        exist.image = [...exist.image, cur.img_url];
        return acc;
      }

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

const filterProducts = async (req, res) => {
  try {
    let { max_price, cat_id, bra_ids, rating } = req.query;
    const min_price = 0;
    if (!Array.isArray(bra_ids)) {
      bra_ids = [bra_ids];
    }
    const results = await search.filterProducts(
      parseFloat(min_price),
      parseFloat(max_price),
      cat_id,
      bra_ids,
      parseFloat(rating)
    );

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
      const exist = acc.find((item) => item.id === cur.pro_id);

      if (!exist) {
        acc.push({
          id: cur.pro_id,
          name: cur.pro_name,
          desc: cur.pro_desc,
          material: cur.pro_material,
          price: cur.pro_price,
          category: {
            id: category[0].cat_id,
            label: category[0].cat_name,
            parent: category[0].cat_parent,
          },
          brand: { id: brand[0].bra_id, label: brand[0].bra_name },
          producer: producer[0],
          seller: seller[0],
          rat_count: cur.rat_count,
          average_rating: parseInt(averageRating),
          image: [cur.img_url],
        });
      } else {
        exist.image = [...exist.image, cur.img_url];
        return acc;
      }

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

const searchProductByKey = async (req, res) => {
  try {
    let { key } = req.query;
    const results = await search.searchProductByKey(key.toLowerCase());

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
      const exist = acc.find((item) => item.id === cur.pro_id);

      if (!exist) {
        acc.push({
          id: cur.pro_id,
          name: cur.pro_name,
          desc: cur.pro_desc,
          material: cur.pro_material,
          price: cur.pro_price,
          category: {
            id: category[0].cat_id,
            label: category[0].cat_name,
            parent: category[0].cat_parent,
          },
          brand: { id: brand[0].bra_id, label: brand[0].bra_name },
          producer: producer[0],
          seller: seller[0],
          rat_count: cur.rat_count,
          average_rating: parseInt(averageRating),
          image: [cur.img_url],
        });
      } else {
        exist.image = [...exist.image, cur.img_url];
        return acc;
      }

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
  getAllProductByCategory,
  filterProducts,
  searchProductByKey,
};
