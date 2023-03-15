// Routing for collections page where products are displayed to users

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const productQueries = require('../db/queries/product_queries');


// Middleware function that will be applied to all routes in the router
router.use((req, res, next) => {
  // Check if user is authenticated
  if (req.session && req.session.authenticated) {
  next();
  } else {
  res.render('error');
  }
  });

  /*
router.get('/', (req, res) => {
  const query = `SELECT * FROM products`;
  console.log(query);
  db.query(query)
    .then(data => {
      const products = data.rows;
      res.json({ products });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});
*/


router.get('/', (req, res) => {
  const email = req.session.email;
  productQueries.getProducts()
    .then((products) => {
      console.log('from product routes line 21', products);
      return res.render('main', { products, email })
    })
    .catch((error) => {
      res.status(500).send('Error retrieving product data');
    });
});

module.exports = router;
