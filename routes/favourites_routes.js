const express = require('express');
const router = express.Router();
const favouritesQueries = require('../db/queries/favourites_queries');
const userQueries = require('../db/queries/users_queries');

//CREATE

router.post('/', (req, res) => {
  const { email } = req.session;

  if (!email) {
    return res.status(401).send('Please log in to view your favourite items')
  }
  userQueries.getUserByEmail(email)
  .then(user => {
    if (!user) {
      return res.status(401).send('User is not valid')
    }

    const {item_id} = req.body;
      if (!item_id) {
      return res.status(401).send('item_id is not valid')
      }

      const newFavorite = {
        user_id: user.id, item_id
      }

      favouritesQueries
      .addFavourite(newFavorite)
      .then((favourite) => {
        return res.redirect('/favourites');
      })
      .catch((err) => {
        console.log(err.message);
      });
  })

})



//READ
router.get('/', (req, res) => {
  const { email } = req.session;

  if (!email) {
    return res.status(401).send('Please log in to view your favourite items')
  }

  favouritesQueries
    .getFavourites(email)
    .then((favourites) => {
      return res.render('favourites', { favourites, email })
    })
    .catch((err) => {
      console.log(err.message);
    });
})


//UPDATE


//DELETE

router.post('/remove', (req, res) => {
  const { email } = req.session;

  if (!email) {
    return res.status(401).send('Please log in to view your favourite items')
  }
  userQueries
  .getUserByEmail(email)
  .then(user => {
    if (!user) {
      return res.status(401).send('User is not valid')
    }

    const {item_id} = req.body;
      if (!item_id) {
      return res.status(401).send('item_id is not valid')
      }

      const oldFav = {
        email, item_id
      }

      favouritesQueries
      .deleteFavourite(oldFav)
      .then(() => {
        return res.redirect('/favourites');
      })
      .catch((err) => {
        console.log(err.message);
      });
  })
})

module.exports = router;
