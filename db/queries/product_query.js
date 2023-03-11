// what type of queries do we need from product?
//

const db = require('../connection');

const getProducts = () => {
  return db.query('SELECT * FROM products;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getProducts };
