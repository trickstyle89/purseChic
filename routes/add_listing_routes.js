const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const productQueries = require('../db/queries/product_queries');


router.get('/', (req, res) => {
  res.render('add_listing');
});

router.post('/', (req, res) => {
  const { title, price, description, product_photo, seller_id } = req.body;
  productQueries.addProduct({ title, price, description, product_photo, seller_id }) //because it is directly from EJS names.
    .then((newproduct) => {
      res.redirect('/main')
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error registering new user data!');
    });
});

module.exports = router;
