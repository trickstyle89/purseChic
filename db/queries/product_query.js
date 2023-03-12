// what type of queries do we need from product?
//

const db = require('../connection');

const getProducts = () => {
  return db.query('SELECT * FROM products;')
    .then(data => {
      console.log('products line 9', data.rows);
      return data.rows;
    });
};

module.exports = { getProducts };

// be sure to run the seed file.
// console to see if this works at all Confirmed.
// export module and then import into server.js to use a helper
// then put this in server.js to see if that works using as a callback in the app(). Console from there
// the put the exported OBJECT into EJS via <%
// then maybe include AJAX for more dynamic site.
