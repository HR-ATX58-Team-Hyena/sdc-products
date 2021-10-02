const express = require('express');
const cors = require('cors');
const { getProducts } = require('../database/queries/index');

const app = express();
const port = 4444;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Connected to the Database');
});

app.get('/getProductList', (req, res) => {
  getProducts((err, allProducts) => {
    if (err) {
      console.log('Error to retrieve all products');
      res.status(404).send();
    } else {
      res.send(allProducts);
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
