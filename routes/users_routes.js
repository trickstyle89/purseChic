/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

//userQueries is just a name for ALL the imported helpers
const userQueries = require('../db/queries/users_queries');


router.get('/', (req, res) => {
  userQueries.userTest()
    .then((name) => {
      // res.json(test); just sends a JSON that overwrites everything on EJS.
      res.render('index', { user: name });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error retrieving test data');
    });
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
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
