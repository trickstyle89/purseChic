const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

// *** test run ***
const userTest = () => {
  return db.query('SELECT first_name FROM users LIMIT 1;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers, userTest };
