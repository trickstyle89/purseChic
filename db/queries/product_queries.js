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

// tested and returns only an object of URL links.
const getProductsImage = () => {
  return db.query('SELECT product_photo FROM products;')
    .then(data => {
      // console.log('products line 17 from products_query.js', data.rows)
      return data.rows;
      // return data.rows[0]; [0] for the happy path to take the array out and just get the object.
    });
};

const addProduct = function(products) {
  return db.query(`
  INSERT INTO products (title, price, description, product_photo, seller_id)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `, [products.title, products.price, products.description, products.product_photo, products.seller_id]
  )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// A simple filter for price. *** Not tested ***
const filterPrice = function(minPrice, maxPrice) {
  return db.query(`
      SELECT * FROM products WHERE price >= $1 AND price <= $2;
    `, [minPrice, maxPrice])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};


// A  filter for favorited items . *** Not tested ***
const filterFavorites = function(favorites) {
  return db.query(`
    SELECT items.*
    FROM items
    JOIN favorites ON items.id = favorites.item_id
    WHERE favorites.user_id = $1;    `, [favorites.user_id])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};



module.exports = { getProducts, getProductsImage, addProduct, filterPrice, filterFavorites };

// be sure to run the seed file to populate you DB
// console to see if this works at all Confirmed with CONSOLE.LOG on line 9.
// export module and then import into server.js to use a helper
// then put this in server.js to see if that works using as a callback in the app(). Console from there

// if that works then export to appropriate file under ROUTES
// take the exported OBJECT from ROUTES and inject into EJS via <li><%= user.first_name %></li>
// then maybe include AJAX for more dynamic site after this step but only as a stretch.

