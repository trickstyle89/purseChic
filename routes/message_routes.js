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

router.get('/', (req, res) => {
  const email = req.session.email;
  messageQueries.getAllMessages()
    .then(messages => {
      const templateVars = { messages, email }
      res.render('messages', templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//Using the email cookie to find all message info
// outputs object with sender.id, chat_id, message_content
// *** not tested ***
router.post('/', (req, res) => {
  const email = req.session.email
  const text = req.body
  messageQueries.findChatData(email)
    .then(chatData => {
      const tempData = { textID }
      messageQueries.addUserMessages(textID.sender_id, textID.chat_id, text)
        .then(messages => {
          const templateVars = { messages, email };
          res.render('messages', templateVars);
        })
        .catch(err => {
          res
            .status(500).json({ error: err.message });
        });
    })
});





module.exports = router;
