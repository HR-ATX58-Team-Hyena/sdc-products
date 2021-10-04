const { pool } = require('../index');

const getProductInfo = (productId, callback) => {
  const queryString = `SELECT * from product_list WHERE id = ${productId};`;

  pool.query(queryString, (err, productInfo) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, productInfo);
    }
  });
};

module.exports = getProductInfo;
