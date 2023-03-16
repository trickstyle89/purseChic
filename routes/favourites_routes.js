const express = require('express');
const router = express.Router();
const favouritesQueries = require('../db/queries/favourites_queries');

//CREATE

//READ
router.get('/', (req, res) => {
  const { email } = req.session;

  if (!email) {
    return res.status(401).send('Please log in to view your favourite items')
  }

  favouritesQueries
    .getFavourites()
    .then((favourites) => {
      return res.render('checkout', { favourites, email })
    })

})


//UPDATE

//DELETE

module.exports = router;
