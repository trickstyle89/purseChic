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
  return db.query('SELECT email FROM users LIMIT 1;')
    .then(data => {
      // console.log('users line 17 from users_query.js, LIMIT 1', data.rows);
      return data.rows[0];
    });
};

const addUser = function(users) {
  return db.query(`
  INSERT INTO users (first_name, last_name, email, password)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `, [users.first_name, users.last_name, users.email, users.password]
  )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};


const checkUser = function(users) {
  return db.query(`
  SELECT *
  FROM users
  WHERE email = $1 AND password = $2;
  `, [users.email, users.password]
  )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getUserByEmail = (email) => {
  return db.query(`
    SELECT *
    FROM users
    WHERE email = $1
  `, [email]).then((result) => {
    return result.rows[0];
  });
}

const getUserProducts = (email) => {
  return db.query(`
  SELECT products.*
  FROM products
  JOIN users ON seller_id = users.id
  WHERE users.email = $1
  `, [email])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}


module.exports = { getUsers, userTest, addUser, checkUser, getUserByEmail, getUserProducts };
