const { pool } = require('../index');

const getProductInfo = (productId, callback) => {
  const queryString = `SELECT JSON_AGG((id, name, slogan, description, category, default_price)) FROM product_list WHERE id = ${productId};`;

  pool.query(queryString, (err, productInfo) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, productInfo);
    }
  });
};

module.exports = getProductInfo;
