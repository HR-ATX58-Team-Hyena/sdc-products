const express = require('express');
const cors = require('cors');
const {
  getProductList,
  getProductInfo,
  getProductStyles,
  getRelatedProducts,
  getCart,
  addToCart,
} = require('../database/queries/index');

const app = express();
const port = 4444;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Connected to the Database');
});

app.get('/products/list', (req, res) => {
  getProductList((err, allProducts) => {
    if (err) {
      console.log('Error to retrieve all products');
      res.status(404).send(err);
    } else {
      res.send(allProducts);
    }
  });
});

app.get('/products/:product_id', (req, res) => {
  const productId = req.params.product_id;
  getProductInfo(productId, (err, productInfo) => {
    if (err) {
      console.log('Error retrieving individual product info');
      res.status(404).send(err);
    } else {
      res.send(productInfo.rows);
    }
  });
});

app.get('/products/:product_id/styles', (req, res) => {
  const productId = req.params.product_id;
  getProductStyles(productId, (err, stylesData) => {
    if (err) {
      console.log('Error retrieving styles data');
      res.status(404).send(err);
    } else {
      res.send(stylesData.rows);
    }
  });
});

app.get('/products/:product_id/related', (req, res) => {
  const productId = req.params.product_id;
  getRelatedProducts(productId, (err, relatedInfo) => {
    if (err) {
      console.log('Error retrieving related info');
      res.status(404).send(err);
    } else {
      res.send(relatedInfo.rows);
    }
  });
});

app.get('/cart', (req, res) => {
  const { userToken } = req.query;
  getCart(userToken, (err, response) => {
    if (err) {
      console.log('Error retrieving cart', userToken);
      res.status(404).send(err);
    } else {
      res.send(response);
    }
  });
});

app.post('/cart', (req, res) => {
  const params = {
    usertoken: req.query.userToken,
    sku_id: req.query.sku_id,
    active: true,
  };
  addToCart(params, (err, response) => {
    if (err) {
      console.log('Error adding to cart');
      res.status(404).send(err);
    } else {
      res.status(201).send(req.query.sku_id, 'added to cart');
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log('Error creating Server');
  } else {
    console.log(`Listening on port ${port}`);
  }
});
