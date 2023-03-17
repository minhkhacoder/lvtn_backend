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

  createSeller(seller) {
    const sql = "CALL sp_create_seller(?,?,?)";
    return new Promise((resolve, reject) => {
      db.query(sql, [seller.id, seller.name, seller.address], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  updateSeller(id, desc, avatar) {
    const sql =
      "UPDATE seller SET seller_desc = ?, seller_avatar = ? WHERE seller_id = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [desc, avatar, id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  getInfoSeller(id) {
    const sql = "SELECT * FROM seller WHERE acc_id = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  getSellerById(id) {
    const sql = "SELECT * FROM seller WHERE seller_id = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  getLinkAvatar(id) {
    const sql = "SELECT seller_avatar FROM seller WHERE seller_id = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        resolve(result[0].seller_avatar);
      });
    });
  }
}

module.exports = Seller;
