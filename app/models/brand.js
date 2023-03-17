/** @format */

const db = require("../common/database");

class Brand {
  constructor(bra_id, bra_name) {
    this.bra_id = bra_id;
    this.bra_name = bra_name;
  }

  getAllBrand() {
    const sql = `SELECT * FROM brand`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  createBrand(name) {
    const sql = `INSERT INTO brand(bra_name) VALUES(?)`;
    return new Promise((resolve, reject) => {
      db.query(sql, [name], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  getBrandById(id) {
    const sql = `SELECT * FROM brand WHERE bra_id = ?;`;
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Brand;
