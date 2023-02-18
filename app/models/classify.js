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
}

module.exports = Classify;
