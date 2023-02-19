/** @format */

const db = require("../common/database");

class Images {
  constructor(img_url, pro_id, img_name) {
    this.img_url = img_url;
    this.pro_id = pro_id;
    this.img_name = img_name;
  }

  addImage(image) {
    const sql = `INSERT INTO images VALUES(?, ?, ?)`;
    return new Promise((resolve, reject) => {
      db.query(
        sql,
        [image.img_url, image.pro_id, image.img_name],
        (err, result) => {
          if (err) reject(err);
          resolve(true);
        }
      );
    });
  }

  getImagesByProductId(id) {
    const sql = `SELECT * FROM images WHERE pro_id = ?`;
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  deleteImage(image) {
    const sql = "DELETE FROM images WHERE img_url = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [image.img_url], (err, result) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }
}

module.exports = Images;
