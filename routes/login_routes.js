const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const userQueries = require('../db/queries/users_queries');


router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  const { email, password } = req.body;
  userQueries.checkUser({ email, password })
    .then((user) => {
      if (!user) {
        throw new Error('User not found');
      }
      if (user.password !== password) {
        throw new Error('Wrong password');
      }
      res.redirect('/success');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error logging in!');
    });
});

module.exports = router;
