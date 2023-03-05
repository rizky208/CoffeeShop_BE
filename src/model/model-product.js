const db = require("../../helper(db)/connection");
const { v4: uuidv4 } = require("uuid");

const productModel = {
  query: (queryParams, sortType = "asc") => {
    if (queryParams.search && queryParams.cat) {
      return `WHERE name ILIKE '%${queryParams.search}%' AND category ILIKE '%${queryParams.cat}%' ORDER BY name ${sortType}`;
    } else if (queryParams.search || queryParams.cat) {
      return `WHERE name ILIKE '%${queryParams.search}%' OR category ILIKE '%${queryParams.cat}%' ORDER BY name ${sortType}`;
    } else {
      return `ORDER BY name ${sortType}`;
    }
  },
  get: function (queryParams) {
    console.log(queryParams);
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT product.*, product_image.filename AS image
        FROM product
        LEFT JOIN product_image ON product.id=product_image.id_product ${this.query(
          queryParams,
          queryParams.sortBy,
          queryParams.limit
        )} LIMIT ${queryParams.limit} OFFSET (${queryParams.page - 1}) * ${
          queryParams.limit
        }`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result.rows);
          }
        }
      );
    });
  },
  getDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * from product WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result.rows[0]);
        }
      });
    });
  },
  add: ({ name, description, price, category, img }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO product (id, name, description, price, category) VALUES ('${uuidv4()}','${name}','${description}','${price}','${category}') RETURNING id`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            console.log(result);
            db.query(
              `INSERT INTO product_image (id_image, id_product, name, alt_name, filename) VALUES($1, $2 ,$3 , $4, $5)`,
              [uuidv4(), result.rows[0].id, name, name, img]
            );
            return resolve({ name, description, price, category, img });
          }
        }
      );
    });
  },
  update: ({ id, name, description, price, category }) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM product WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          db.query(
            `UPDATE product SET name='${
              name || result.rows[0].name
            }', description='${
              description || result.rows[0].description
            }',price='${price || result.rows[0].price}', category='${
              category || result.rows[0].category
            }' WHERE id='${id}'`,
            (err, result) => {
              if (err) {
                return reject(err.message);
              } else {
                if (file.length <= 0)
                  return resolve({ id, title, price, category });
                db.query(
                  `SELECT id_image, filename FROM product_images WHERE id_product="${id}"`,
                  (errProductImages, productImages) => {
                    if (errProductImages)
                      return reject({ message: errProductImages.message });
                    console.log(resultOld);
                    console.log(file);
                    for (
                      let indexOld = 0;
                      indexOld < resultOld.rowCount;
                      indexOld++
                    ) {
                      for (
                        let indexNew = 0;
                        indexNew < resultNew.rowCount;
                        indexNew++
                      ) {
                        db.query(`UPDATE`);
                      }
                    }
                  }
                );
              }
            }
          );
        }
      });
    });
  },
  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE from product WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          db.query(
            `DELETE from product_image WHERE id_product='${id}' RETURNING filename`,
            (err, result) => {
              if (err) return reject({ message: "gambar gagal dihapus" });
              return resolve(result.rows);
            }
          );
        }
      });
    });
  },
};

module.exports = productModel;
