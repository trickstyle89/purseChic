const db = require('../connection');

// CREATE

const addFavourite = (newFavourite) => {

}

// READ ALL
const getFavourites = (email) => {
  return db
    .query(`
    SELECT products.* FROM products
    JOIN favorites ON products.id = favorites.item_id
    JOIN users ON favorites.user_id = users.id
    WHERE users.email = $1`, [email])
    .then((data) => data.rows)
};

//READ ONE


//UPDATE


//DELETE

const deleteFavourite = (productID) => {

}

module.exports = { getFavourites };
