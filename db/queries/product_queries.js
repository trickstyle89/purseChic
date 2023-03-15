// what type of queries do we need from product?
//

const db = require('../connection');

//CRUD

//CREATE
const addProduct = function(product) {
  return db.query(`
  INSERT INTO products (title, price, description, product_photo, seller_id)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `, [product.title, product.price, product.description, product.product_photo, product.seller_id]
  )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//READ ALL
const getProducts = () => {
  return db.query('SELECT * FROM products LIMIT 3;')
    .then(data => {
      return data.rows;

    });
};

// READ ONE
const getProductById = (productID) => {
  return db.query('SELECT * FROM products WHERE id=$1;', [productID])
    .then(data => {
      return data.rows[0];
    });
};

//UPDATE

//DELETE


// tested and returns only an object of URL links. - dont think its needed.
// const getProductsImage = () => {
//   return db.query('SELECT product_photo FROM products;')
//     .then(data => {
//       return data.rows[0];
//     });
// };


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



module.exports = { getProducts, addProduct, filterPrice, filterFavorites, getProductById };

// be sure to run the seed file to populate you DB
// console to see if this works at all Confirmed with CONSOLE.LOG on line 9.
// export module and then import into server.js to use a helper
// then put this in server.js to see if that works using as a callback in the app(). Console from there

// if that works then export to appropriate file under ROUTES
// take the exported OBJECT from ROUTES and inject into EJS via <li><%= user.first_name %></li>
// then maybe include AJAX for more dynamic site after this step but only as a stretch.

