// Routing for collections page where products are displayed to users

const express = require('express');
const router = express.Router();
// const db = require('../db/connection');
const productQueries = require('../db/queries/product_queries');

// CRUD
//Create - post
router.post('/', (req, res) => {
  const { email } = req.session;

  if (!email) {
    return res.status(401).send('Please log in to add listing')
    // we can use template var to return error message
  }
  productQueries
    .addProduct({ ...req.body }) //passing object with all properties
    .then((newProduct) => {
      console.log('from product routes line 21', newProduct);
      return res.redirect('/collection')
    })
});


// add listing - this pulls up the form to add new listing
router.get('/new', (req, res) => {
  const { email } = req.session;
  const templateVars = {
    email
  }
  if (!email) {
    return res.status(401).send('Please log in to add listing')

  }
  return res.render('add_listing', templateVars);
});


//Read all - GET - this will be displayed on /collections page. Users do not need to be logged in for this
router.get('/', (req, res) => {
  const { email } = req.session;
  productQueries
    .getProducts()
    .then((products) => {
      return res.render('main', { products, email })
    })
});

//Read one - GET - if you want to retrieve a single item
router.get('/:id', (req, res) => {
  const { email } = req.session;
  const productID = req.params.id;
  productQueries
    .getProductById(productID)
    .then((products) => {
      console.log('from product routes line 33', products);
      return res.render('main', { products, email })
    })
});

//Update - put or post
router.post('/:id/edit', (req, res) => {
  const { email } = req.session;
  const productID = req.params.id;

  if (!email) {
    return res.status(401).send('Please log in to edit listing')
    // we can use template var to return error message
  }

  productQueries
    .updateProduct(productID)
    .then((products) => {
      console.log('from product routes line 21', products);
      return res.redirect('my_listing', { products, email })
    })
});

//Delete - delete or post
router.post('/:id/delete', (req, res) => {
  const { email } = req.session;
  const productID = req.params.id;

  if (!email) {
    return res.status(401).send('Please log in to delete listing')
    // we can use template var to return error message
  }
  productQueries
    .deleteProduct()
    .then((products) => {
      console.log('from product routes line 21', products);
      return res.redirect('my_listing')
    })
});


module.exports = router;
