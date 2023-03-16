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
router.get('/', (req, res) => {
  const email = req.session.email;
  let chatData;

  // finds the chat.it and sender.id for the user from cookie.
  messageQueries.findChatData(email)
    .then(result => {
      chatData = result;
      return messageQueries.getAllMessages();
    })
    .then(messages => {
      const templateVars = { messages, email };
      res.render('messages', templateVars);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});
*/

router.get('/', (req, res) => {
  const email = req.session.email;
  messageQueries.findChatData(email)
  .then((chatData) => {
    console.log('line47', chatData);
    const chatId = chatData.chat_id;
    const senderId = chatData.sender_id;
    console.log('line50', chatId);
    console.log('line51', chatId);
    return messageQueries.findChatMessages(chatId, senderId);
  })
  .then((messages) => {
    console.log(messages);
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
