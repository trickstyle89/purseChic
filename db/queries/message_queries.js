const db = require('../connection');

const getAllChats = () => {
  return db.query(`
  SELECT * FROM chats;
`)
    .then(data => {
      return data.rows[0];
    });
};

const getAllMessages = () => {
  return db.query(`
  SELECT message_content
  FROM messages;
  `)
    .then(data => {
      return data.rows;
    });
};

const getUserMessages = () => { // not done.
  return db.query(`
  SELECT messages.*, users.first_name, users.last_name
  FROM messages
  JOIN users ON messages.sender_id = users.id
  WHERE chat_id = 1
  ORDER BY created_on ASC;
  `)
    .then(data => {
      return data.rows[0];
    });
};

const addUserMessages = function (sender_id, chat_id, message_content) {
  return db.query(`
  INSERT INTO messages (sender_id, chat_id, message_content)
  VALUES ($1, $2, $3)
  RETURNING *;
  `, [messages.sender_id, messages.chat_id, messages.messages_content]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
  };


const findChatData = function (email) {
return db.query(`
SELECT messages.chat_id, messages.sender_id
FROM messages
JOIN users ON messages.sender_id = users.id
WHERE users.email = $1;
`, [email]
 )
 .then((result) => {
  return result.rows[0];
})
.catch((err) => {
  console.log(err.message);
});
};


const addMessagesTest = function (sender_id, chat_id, message_content) {
  message_content = req.body;
  sender_id = 1;
  chat_id = 1;
  return db.query(`
  INSERT INTO messages (sender_id, chat_id, message_content)
  VALUES ($1)
  RETURNING *;
  `, [sender_id, chat_id, message_content]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
  };

module.exports = { getAllChats, getAllMessages, getUserMessages, addUserMessages, findChatData, addMessagesTest };
