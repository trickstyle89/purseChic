// const express = require('express');
// const router = express.Router();
// const userQueries = require('../db/queries/users_queries.js');


// // pull up page that displays users listings that belong to them
// router.get('/', (req, res) => {
//   const { email } = req.session;
//   if (!email) {
//     return res.status(401).send('Please log in to view your listings')
//   }
//   userQueries
//     .getUserProducts(email)
//     .then((products) => {
//       return res.render('my_listing', { email, products })
//     })
// });

// router.delete('/:id', function(req, res) {
//   const productId = req.params.id;
//   Product.findByIdAndDelete(productId, function(err, deletedProduct) {
//     if (err) {
//       console.log(err);
//       res.status(500).send('Failed to delete product');
//     } else {
//       console.log('Deleted product:', deletedProduct);
//       res.status(200).send('Product deleted successfully');
//     }
//   });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users_queries.js');

// pull up page that displays users listings that belong to them
router.get('/', (req, res) => {
  const { email } = req.session;
  if (!email) {
    return res.status(401).send('Please log in to view your listings')
  }
  userQueries
    .getUserProducts(email)
    .then((products) => {
      return res.render('my_listing', { email, products })
    })
});

router.delete('/:id', function(req, res) {
  const productId = req.params.id;
  userQueries.deleteProduct(productId)
    .then(() => {
      console.log('Deleted product with ID:', productId);
      res.status(200).send('Product deleted successfully');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Failed to delete product');
    });
});

module.exports = router;
