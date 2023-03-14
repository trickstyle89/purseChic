// Routing for collections page where products are displayed to users

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const productQueries = require('../db/queries/product_queries');

// Middleware function that will be applied to all routes in the router
// router.use((req, res, next) => {
//   // Check if user is authenticated
//   if (req.session && req.session.authenticated) {
//     next();
//   } else {
//     res.render('error');
//   }
// });

router.get('/', (req, res) => {
  productQueries.getProducts()
    .then((products) => {
      console.log('from product routes line 21', products);
      // const templateVars = { products };
      res.render('main', { products })
      // res.json(products);
    })
    .catch((error) => {
      // console.error(error);
      res.status(500).send('Error retrieving product data');
    });
});

module.exports = router;
