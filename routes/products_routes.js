// Routing for collections page where products are displayed to users

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const productQueries = require('../db/queries/product_queries');

// CRUD
//Create - post
router.post('/', (req, res) => {
  const email = req.session.email;
  productQueries.addProduct({ ...req.body })
    .then((products) => {
      console.log('from product routes line 21', products);
      return res.render('main', { products, email })
    })
});
//Read all - get
router.get('/', (req, res) => {
  const email = req.session.email;
  productQueries.getProducts()
    .then((products) => {
      return res.render('main', { products, email })
    })
});

//Read one - get - if you want to retrieve a single item
router.get('/:id', (req, res) => {
  const email = req.session.email;
  const productID = req.params.id;
  productQueries.getProductById(productID)
    .then((products) => {
      console.log('from product routes line 21', products);
      return res.render('main', { products, email })
    })
});
//Update - put or post
router.post('/:id/edit', (req, res) => {
  const email = req.session.email;
  productQueries.getProducts()
    .then((products) => {
      console.log('from product routes line 21', products);
      return res.render('main', { products, email })
    })
});

//Delete - delete or post
router.post('/:id/delete', (req, res) => {
  const email = req.session.email;
  productQueries.getProducts()
    .then((products) => {
      console.log('from product routes line 21', products);
      return res.render('main', { products, email })
    })
});





module.exports = router;
