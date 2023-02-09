/** @format */

const db = require("../common/database");
const Accounts = require("../models/accounts");

class Seller extends Accounts {
  constructor(
    seller_id,
    acc_id,
    seller_name,
    seller_desc,
    seller_address,
    seller_avatar
  ) {
    super(acc_id);
    this.seller_id = seller_id;
    this.seller_name = seller_name;
    this.seller_desc = seller_desc;
    this.seller_address = seller_address;
    this.seller_avatar = seller_avatar;
  }

  createSeller(acc_id, seller_name, seller_address) {
    const sql = "SELECT fn_create_seller(?,?,?)";
    return new Promise((resolve, reject) => {
      db.query(sql, [acc_id, seller_name, seller_address], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = Seller;
