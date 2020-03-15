const express = require('express');
const cors = require('cors');
const app = express();
const productJSON = require('../src/json/product.json');
const walletJSON = require('../src/json/wallet.json');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/vm/product', (req, res) => {
  res.send(productJSON);
});
app.get('/vm/wallet', (req, res) => {
  res.send(walletJSON);
});

app.listen(8080);

module.exports = app;