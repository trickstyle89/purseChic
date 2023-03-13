const express = require('express');
const router = express.Router();

//userQueries is just a name for ALL the imported helpers
const userQueries = require('../db/queries/users_queries');

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', (req, res) => {
  userQueries.addUser(req.body) //because it is directly from EJS names.
    // userQueries.addUser(req.body) // req.params for websites.
    .then((newUser) => {
      res.redirect('/main') // is that where we want to send it?
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error registering new user data!');
    });
});

module.exports = router;
