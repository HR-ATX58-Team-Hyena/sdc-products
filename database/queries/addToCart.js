const { pool } = require('../index');

const addToCart = (params, callback) => {
  const queryString = `INSERT INTO cart (user_session, product_id, active) VALUES ($1, $2, $3)`;

  pool.query(queryString, params, (err, cart) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, cart);
    }
  });
};

module.exports = addToCart;
