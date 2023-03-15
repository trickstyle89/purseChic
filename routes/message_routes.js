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
  const { message } = req.body;
  const email = req.session.email;

  messageQueries.addMessage(1, 1, message)  // the plan is to have the user_id and the chat_id provided....
  .then(() => {
    return messageQueries.getAllMessages(); // fetch all the messages from the database
  })
  .then(messages => {
    const templateVars = {
      messages,
      email
    };
    res.render('messages', templateVars);
  })
  .catch(err => {
    res.status(500).json({ error: err.message });
  });
});

*/
router.get('/', (req, res) => {
  const email = req.session.email;
  let chatData;

  messageQueries.findChatData(email)
    .then(result => {
      chatData = result;
      return messageQueries.getUserMessages();
    })
    .then(messages => {
      const templateVars = {
        first_name,
        last_name,
        messages,
        email };
      res.render('messages', templateVars);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  const { message } = req.body;
  const email = req.session.email;

  messageQueries.findChatData(email)
    .then(result => {
      const sender_id = result.sender_id;
      const chat_id = result.chat_id;
      return messageQueries.addMessage(sender_id, chat_id, message);
    })
    .then(() => {
      return messageQueries.getAllMessages(); // fetch all the messages from the database
    })
    .then(messages => {
      const templateVars = { messages, email };
      res.render('messages', templateVars);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});






module.exports = router;
