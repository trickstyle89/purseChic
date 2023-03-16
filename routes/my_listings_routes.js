const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users_queries.js');


// pull up page that displays users listings that belong to them
router.get('/', (req, res) => {
  const { email } = req.session;
  if (!email) {
    return res.status(401).send('Please log in to view your listings')
  }
  userQueries
    .getUserProducts(email)
    .then((products) => {
      return res.render('my_listing', { email, products })
    })
})

module.exports = router;
