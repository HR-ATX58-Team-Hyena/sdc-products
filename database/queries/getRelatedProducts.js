const { pool } = require('../index');

const getRelatedProducts = (productId, callback) => {
  const queryString = `SELECT * from related WHERE current_product_id = ${productId}`;

  pool.query(queryString, (err, relatedInfo) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, relatedInfo);
    }
  });
};

module.exports = getRelatedProducts;
