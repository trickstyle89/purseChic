/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const messageQueries = require('../db/queries/message_queries');
/*
router.get('/', (req, res) => {
  messageQueries.getAllMessages()
    .then(data => {
      res.render('messages', {
        messages: data.rows
      });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});
*/



router.get('/', (req, res) => {
  messageQueries.getAllMessages()
    .then(messages => {
      console.log('from message routes line 32', messages);
      const templateVars = {messages}
      res.render('messages', templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


module.exports = router;
