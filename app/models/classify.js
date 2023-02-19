/** @format */

const db = require("../common/database");

class Classify {
  constructor(cla_id, pro_id, cla_group, cla_name) {
    this.cla_id = cla_id;
    this.pro_id = pro_id;
    this.cla_group = cla_group;
    this.cla_name = cla_name;
  }

  createClassify(classify) {
    const sql = `INSERT INTO classify(pro_id, cla_group, cla_name) VALUES (?,?,?)`;
    return new Promise((resolve, reject) => {
      db.query(
        sql,
        [classify.pro_id, classify.cla_group, classify.cla_name],
        (err, result) => {
          if (err) reject(err);
          resolve(true);
        }
      );
    });
  }

  getClasifyById(id) {
    const sql = "SELECT * FROM classify WHERE pro_id = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  updateClassify(id, classify) {
    const sql = `UPDATE classify SET
    pro_id = ?,
    cla_group = ?,
    cla_name = ?
    WHERE cla_id = ?`;
    return new Promise((resolve, reject) => {
      db.query(
        sql,
        [
          classify.pro_id,
          classify.cla_group,
          classify.cla_name,
          classify.cla_id,
        ],
        (err, result) => {
          if (err) reject(err);
          resolve(true);
        }
      );
    });
  }

  deleteClassify(id) {
    const sql = "DELETE FROM classify WHERE cla_id = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }
}

module.exports = Classify;
