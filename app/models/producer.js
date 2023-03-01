/** @format */

const db = require("../common/database");

class Producer {
  constructor(prod_id, prod_name) {
    this.prod_id = prod_id;
    this.prod_name = prod_name;
  }

  // getAllBrand() {
  //   const sql = `SELECT * FROM brand`;
  //   return new Promise((resolve, reject) => {
  //     db.query(sql, (err, results) => {
  //       if (err) reject(err);
  //       resolve(results);
  //     });
  //   });
  // }

  createProducer(name) {
    const sql = `INSERT INTO producer(prod_name) VALUES(?)`;
    return new Promise((resolve, reject) => {
      db.query(sql, [name], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  findOneId(name) {
    const sql = `SELECT prod_id FROM producer WHERE prod_name = ?`;
    return new Promise((resolve, reject) => {
      db.query(sql, [name], (err, results) => {
        if (err) reject(err);
        resolve(results[0].prod_id);
      });
    });
  }
}

module.exports = Producer;
