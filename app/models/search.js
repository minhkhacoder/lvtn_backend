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

  filterProducts(min_price, max_price, cat_id, bra_ids, rating) {
    const price =
      !isNaN(min_price) && !isNaN(max_price)
        ? "p.pro_price BETWEEN ? AND ?"
        : "";

    const category = cat_id !== undefined ? "p.cat_id = ?" : "";

    const brand =
      bra_ids[0] !== undefined
        ? `p.bra_id IN (${bra_ids.map(() => "?").join(", ")})`
        : "";

    const rate = !isNaN(rating) ? " HAVING AVG(r.rat_point) >= ?" : "";

    const sql = `SELECT p.pro_id, p.cat_id, p.bra_id, p.seller_id, p.prod_id, p.pro_name, p.pro_desc, p.pro_material, p.pro_price,
    COUNT(r.rat_id) AS rat_count, AVG(r.rat_point) AS average_rating, img.img_url
    FROM product p 
    JOIN images img ON p.pro_id=img.pro_id 
    LEFT JOIN rating r ON p.pro_id = r.pro_id
    ${price !== "" || category !== "" || brand !== "" ? "WHERE" : ""} ${price}
	  ${price !== "" && category !== "" ? "AND " + category : category}
	  ${brand !== "" && (price !== "" || category !== "") ? "AND " + brand : brand}
    GROUP BY p.pro_id, img_url
    ${rate};
    `;

    return new Promise((resolve, reject) => {
      let params = [];

      if (!isNaN(min_price) && !isNaN(max_price))
        params.push(min_price, max_price);

      if (cat_id !== undefined) params.push(cat_id);

      if (bra_ids[0] !== undefined) params.push(...bra_ids);

      if (!isNaN(rating)) params.push(rating);

      db.query(sql, params, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}
module.exports = Search;
