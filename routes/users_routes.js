/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

//userQueries is just a name for ALL the imported helpers
const userQueries = require('../db/queries/users_queries');


router.get('/', (req, res) => {
  userQueries.userTest()
    .then((name) => {
      res.render('index', { user: name });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error retrieving test data');
    });
});


module.exports = router;
