/** @format */
const db = require("../common/database");

class Category {
  constructor(cat_id, cat_name, cat_parent) {
    this.cat_id = cat_id;
    this.cat_name = cat_name;
    this.cat_parent = cat_parent;
  }

  getAllCategory() {
    const sql = `SELECT * FROM category`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  getCategoryById(id) {
    const sql = `SELECT * FROM category WHERE cat_id = ?;`;
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  getCategoryByParentId(id) {
    const sql = `SELECT * FROM category WHERE cat_parent = ?;`;
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Category;
