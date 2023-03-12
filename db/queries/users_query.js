const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      console.log('users line 6', data.rows);
      return data.rows;
    });
};

getUsers();

// *** test run ***
const userTest = () => {
  return db.query('SELECT first_name FROM users LIMIT 1;')
    .then(data => {
      console.log('users line 15, LIMIT 1', data.rows);
      return data.rows;
    });
};

userTest();

module.exports = { getUsers, userTest };
