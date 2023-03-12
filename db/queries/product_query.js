// what type of queries do we need from product?
//

const db = require('../connection');

const getProducts = () => {
  return db.query('SELECT * FROM products;')
    .then(data => {
      console.log('products line 9', data.rows)
      return data.rows;
    });
};

module.exports = { getProducts };

// be sure to run the seed file.
// console to see if this works at all Confirmed with CONSOLE.LOG on line 9.
// export module and then import into server.js to use a helper
// then put this in server.js to see if that works using as a callback in the app(). Console from there
// if it does then we can export this to appropriate files under ROUTES
// from ROUTES file, the exported OBJECT into EJS via <li><%= user.first_name %></li>
// then maybe include AJAX for more dynamic site as a stretch once we figure out all the routes.
