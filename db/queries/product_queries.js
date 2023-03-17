// what type of queries do we need from product?
//

const db = require('../connection');

//CRUD

//CREATE
const addProduct = (newProduct) => {
  const { title, price, description, product_photo, seller_id } = newProduct;
  return db
    .query(`
  INSERT INTO products (title, price, description, product_photo, seller_id)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `, [title, price, description, product_photo, seller_id]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Filter price of item low to high
const filterProducts = () => {
  return db
    .query(`SELECT * FROM products
  ORDER BY PRICE;`)
    .then((data) => data.rows)
}

// Filter price of item high to low
const filterProductsHighToLow = () => {
  return db
    .query(`SELECT * FROM products
  ORDER BY PRICE DESC;`)
    .then((data) => data.rows)
}

//READ ALL
const getProducts = () => {
  return db
    .query('SELECT * FROM products;')
    .then((data) => data.rows)
};

// READ ONE
const getProductById = (productID) => {
  return db
    .query('SELECT * FROM products WHERE id=$1;', [productID])
    .then(data => data.rows)
};

const getUserById = (userID) => {
  return db
    .query('SELECT * FROM users WHERE id = $1', [userID])
    .then((data) => data.rows);
};

//UPDATE
const updateProduct = (updatedProduct) => {
  const { title, price, description, product_photo } = updatedProduct;
  return db
    .query('UPDATE products SET title = $1, price = $2, description = $3, product_photo = $4 WHERE id = $5 RETURNING *', [title, price, description, product_photo]) // how do we update this
    .then((data) => data.rows[0]);
};

//DELETE

const deleteProduct = (deletedItem) => {
  const { email, id: { productId } } = deletedItem;

  return db
    .query(`
    DELETE FROM products
    WHERE seller_id = (SELECT id FROM users WHERE email = $1)
    AND products.id = $2 `,
      [email, productId])
}


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


module.exports = { getProducts, addProduct, filterPrice, filterFavorites, getProductById, updateProduct, deleteProduct, getUserById, filterProducts, filterProductsHighToLow };

// be sure to run the seed file to populate you DB
// console to see if this works at all Confirmed with CONSOLE.LOG on line 9.
// export module and then import into server.js to use a helper
// then put this in server.js to see if that works using as a callback in the app(). Console from there

// if that works then export to appropriate file under ROUTES
// take the exported OBJECT from ROUTES and inject into EJS via <li><%= user.first_name %></li>
// then maybe include AJAX for more dynamic site after this step but only as a stretch.

