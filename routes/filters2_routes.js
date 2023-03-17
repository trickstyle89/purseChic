const express = require('express');
const router = express.Router();
const productQueries = require('../db/queries/product_queries.js');

router.get('/', (req, res) => {
  const { email } = req.session;
  productQueries
    .filterProductsHighToLow()
    .then((products) => {
      return res.render('main', { products, email })
    })
});



module.exports = router;
