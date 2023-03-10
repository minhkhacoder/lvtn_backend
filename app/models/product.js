/** @format */
const db = require("../common/database");
class Product {
  constructor(
    pro_id,
    cat_id,
    bra_id,
    seller_id,
    prod_id,
    pro_name,
    pro_desc,
    pro_material,
    pro_price,
    pro_quantity,
    pro_status
  ) {
    this.pro_id = pro_id;
    this.cat_id = cat_id;
    this.bra_id = bra_id;
    this.seller_id = seller_id;
    this.prod_id = prod_id;
    this.pro_name = pro_name;
    this.pro_desc = pro_desc;
    this.pro_material = pro_material;
    this.pro_price = pro_price;
    this.pro_quantity = pro_quantity;
    this.pro_status = pro_status;
  }

  createProduct(product) {
    const sql = `INSERT INTO product
    (
      cat_id,
      bra_id,
      seller_id,
      prod_id,
      pro_name,
      pro_desc,
      pro_material,
      pro_price,
      pro_quantity
    ) 
    VALUES(?,?,?,?,?,?,?,?,?)`;
    return new Promise((resolve, reject) => {
      db.query(
        sql,
        [
          product.cat_id,
          product.bra_id,
          product.seller_id,
          product.prod_id,
          product.pro_name,
          product.pro_desc,
          product.pro_material,
          product.pro_price,
          product.pro_quantity,
        ],
        (err, result) => {
          if (err) reject(err);
          resolve(true);
        }
      );
    });
  }

  getIdProduct(seller_id) {
    const sql = `SELECT pro_id FROM product WHERE seller_id = ? ORDER BY pro_id DESC LIMIT 1`;
    return new Promise((resolve, reject) => {
      db.query(sql, [seller_id], (err, result) => {
        if (err) reject(err);
        resolve(result[0].pro_id);
      });
    });
  }

  getProductById(id) {
    const sql = "SELECT * FROM product WHERE pro_id = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  }

  updateProduct(id, product) {
    const sql = `UPDATE product SET
    cat_id = ?,
    bra_id = ?,
    seller_id = ?,
    prod_id = ?,
    pro_name = ?,
    pro_desc = ?,
    pro_material = ?,
    pro_price = ?,
    pro_quantity = ?
    WHERE pro_id = ?`;
    return new Promise((resolve, reject) => {
      db.query(
        sql,
        [
          product.cat_id,
          product.bra_id,
          product.seller_id,
          product.prod_id,
          product.pro_name,
          product.pro_desc,
          product.pro_material,
          product.pro_price,
          product.pro_quantity,
          id,
        ],
        (err, result) => {
          if (err) reject(err);
          resolve(true);
        }
      );
    });
  }

  deleteProduct(id) {
    const sql = "DELETE FROM product WHERE pro_id = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }
}

module.exports = Product;
