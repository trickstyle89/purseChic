const db = require('../connection');

const getAllMessages = () => {
  return db.query(`
  SELECT message_content
  FROM messages;
  `)
    .then(data => {
      return data.rows;
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

const addMessage = function (sender_id, chat_id, message_content) {
  return db.query(`
  INSERT INTO messages (sender_id, chat_id, message_content)
  VALUES ($1, $2, $3)
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

const findChatMessages = function (chatId, userId) {
  return db.query(`
    SELECT messages.message_content, sender.first_name AS sender, receiver.first_name AS receiver
    FROM messages
    JOIN users AS sender ON messages.sender_id = sender.id
    JOIN chats ON messages.chat_id = chats.id
    JOIN users AS receiver ON (chats.user_one = receiver.id AND chats.user_two = sender.id) OR (chats.user_two = receiver.id AND chats.user_one = sender.id)
    WHERE chats.id = $1 AND (sender.id = $2 OR receiver.id = $2)
    ORDER BY messages.message_created_on ASC;
  `, [chatId, userId])
  .then((result) => {
  return result.rows;
})
  .catch((err) => {
    console.log(err.message);
  });
};

module.exports = { getAllMessages, findChatData, addMessage, findChatMessages };
