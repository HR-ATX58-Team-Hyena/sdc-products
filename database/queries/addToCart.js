const { pool } = require('../index');

const addToCart = (params, callback) => {
  const { userToken, sku_id, active } = params;
  const queryString = `INSERT INTO cart (user_session, product_id, active) VALUES (${userToken}, ${sku_id}, ${active})`;

  pool.query(queryString, (err, cart) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, cart);
    }
  });
};

module.exports = addToCart;
