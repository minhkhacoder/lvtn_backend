/** @format */

const db = require("../common/database");

class Rating {
  constructor(rat_id, pro_id, acc_id, rat_point, rat_desc, rat_timeCreated) {
    this.rat_id = rat_id;
    this.pro_id = pro_id;
    this.acc_id = acc_id;
    this.rat_point = rat_point;
    this.rat_desc = rat_desc;
    this.rat_timeCreated = rat_timeCreated;
  }

  getAllRatingByProductId(id) {
    const sql = `SELECT r.rat_id, r.pro_id, r.acc_id, r.rat_point, 
    r.rat_desc, r.rat_timeCreated, cus.cus_userName
    FROM rating r
    JOIN accounts acc ON r.acc_id = acc.acc_id
    JOIN customer cus ON cus.acc_id = acc.acc_id
    WHERE r.pro_id = ?`;
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Rating;
