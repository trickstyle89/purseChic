const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      // console.log('users line 6 from users_query.js', data.rows);
      return data.rows;
    });
};


// *** test run ***
const userTest = () => {
  return db.query('SELECT first_name FROM users LIMIT 1;')
    .then(data => {
      // console.log('users line 17 from users_query.js, LIMIT 1', data.rows);
      return data.rows[0];
    });
};

userTest();

module.exports = { getUsers, userTest };
