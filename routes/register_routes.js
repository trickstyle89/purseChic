const express = require('express');
const router = express.Router();

//userQueries is just a name for ALL the imported helpers
const userQueries = require('../db/queries/users_queries');

router.get('/', (req, res) => {
  const email = req.session.email;
  const templateVars = {
    email
  }
  res.render('register', templateVars);
});

router.post('/', (req, res) => { //not really sure if I need register in this portion
  const { first_name, last_name, email, password } = req.body;
  userQueries.addUser({ first_name, last_name, email, password }) //because it is directly from EJS names.
    .then((newUser) => {
      res.redirect('/collection') // is that where we want to send it?
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error registering new user data!');
    });
});

module.exports = router;
