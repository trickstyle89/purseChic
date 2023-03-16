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
  messageQueries.findChatData(email)
  .then((chatData) => {

    const chatId = chatData.chat_id;
    const senderId = chatData.sender_id;
    return messageQueries.findChatMessages(chatId, senderId);
  })
  .then((messages) => {
    console.log('Message_routes GET line32', messages);
    const templateVars = {
      messages,
      email };
    res.render('messages', templateVars);
  })
  .catch((err) => {
    console.log(err.message);
    res.status(500).send('Error fetching chat data');
  });
});


router.post('/', (req, res) => {
  const { message } = req.body;
  const email = req.session.email;

  messageQueries.findChatData(email)
    .then(result => {
      sender_id = result.sender_id;
      chat_id = result.chat_id;
            console.log('Message POST line54 Message from req.body', message);
      return messageQueries.addMessage(sender_id, chat_id, message)
        .then(() => ({sender_id, chat_id}));
    })
    .then(({sender_id, chat_id, message}) => {
            console.log('Message POST line58 passing the id between methods', sender_id, chat_id);
      return messageQueries.findChatMessages(sender_id, chat_id);
    })
    .then(messages => {
            console.log('Message POST right before templateVARS afterFindChat line62', messages);
      const templateVars = { messages, email };
            console.log('Message_routes POST templateVARS afterFindChat line64', templateVars);
      res.render('messages', templateVars);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
