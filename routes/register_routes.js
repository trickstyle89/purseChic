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


router.post('/', (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  userQueries.getUserByEmail(email)
    .then((existingUser) => {
      // if (existingUser.rows.length > 0) {
      //   return res.status(400).send('Email already exists');
      // } else
      // {
      return userQueries.addUser({ first_name, last_name, email, password })
        .then((newUser) => {
          req.session.email = newUser.email;
          return res.redirect('/collection');
        })
        .catch((error) => {
          console.error(error);
          return res.status(500).send('Error registering new user data!');
        });
      // }
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send('Error checking if email already exists!');
    });
});
module.exports = router;
