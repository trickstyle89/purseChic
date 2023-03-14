// Routing for collections page where products are displayed to users

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const productQueries = require('../db/queries/product_queries');


router.get('/', (req, res) => {
  const email = req.session.email;
  productQueries.getProducts()
    .then((products) => {
      console.log('from product routes line 21', products);
      // const templateVars = { products };
      res.render('main', { products, email })
      // res.json(products);
      res.json(products);
    })
    .catch((error) => {
      // console.error(error);
      res.status(500).send('Error retrieving product data');
    });
});

module.exports = router;
