/** @format */

const db = require("../common/database");

class Shipping {
  constructor(ship_id, ship_type, ship_fee, ship_time, ship_avatar) {
    this.ship_id = ship_id;
    this.ship_type = ship_type;
    this.ship_fee = ship_fee;
    this.ship_time = ship_time;
    this.ship_avatar = ship_avatar;
  }

  getAllShipping() {
    const sql = `SELECT * FROM shipping`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Shipping;
