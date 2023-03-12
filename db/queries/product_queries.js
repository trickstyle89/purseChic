// what type of queries do we need from product?
//

const db = require('../connection');

const getProducts = () => {
  return db.query('SELECT * FROM products;')
    .then(data => {
      // console.log('products line 9 from products_query.js', data.rows)
      return data.rows;
    });
};

const getProductsImage = () => {
  return db.query('SELECT product_photo FROM products;')
    .then(data => {
      // console.log('products line 17 from products_query.js', data.rows)
      return data.rows;
      // return data.rows[0]; [0] for the happy path to take the array out and just get the object.
    });
};

module.exports = { getProducts, getProductsImage };

// be sure to run the seed file to populate you DB
// console to see if this works at all Confirmed with CONSOLE.LOG on line 9.
// export module and then import into server.js to use a helper
// then put this in server.js to see if that works using as a callback in the app(). Console from there

// if that works then export to appropriate file under ROUTES
// take the exported OBJECT from ROUTES and inject into EJS via <li><%= user.first_name %></li>
// then maybe include AJAX for more dynamic site after this step but only as a stretch.

