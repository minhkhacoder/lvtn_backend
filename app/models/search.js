/** @format */

const db = require("../common/database");

class Search {
  getAllProductByCategory(cat_id) {
    const sql = `SELECT p.pro_id, p.cat_id, p.bra_id, p.seller_id, p.prod_id, p.pro_name, p.pro_desc, p.pro_material, p.pro_price,
    COUNT(r.rat_id) AS rat_count, AVG(r.rat_point) AS average_rating, img.img_url
    FROM product p 
    JOIN images img ON p.pro_id=img.pro_id 
    LEFT JOIN rating r ON p.pro_id = r.pro_id
    WHERE p.cat_id = ?
    GROUP BY p.pro_id, img_url;
    `;
    return new Promise((resolve, reject) => {
      db.query(sql, [cat_id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}
module.exports = Search;
