/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const messageQueries = require('../db/queries/message_queries');

router.use((req, res, next) => {
  const email = req.session.email;
  if (email) {
    next();
  }
  else {
    res.redirect('/login')
  }
});


/*
router.post('/', (req, res) => {
  const {}
  messageQueries.addUserMessages()
    .then(messages => {
      console.log('from message routes line 30', messages);
      const templateVars = {messages}
      res.render('messages', templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});
*/

router.get('/', (req, res) => {
  const email = req.session.email;
  messageQueries.getAllMessages()
    .then(messages => {
      console.log('from message routes line 45', messages);
      const templateVars = { messages, email }
      res.render('messages', templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});




module.exports = router;
