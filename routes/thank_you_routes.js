const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const email = req.session.email;
  const templateVars = {
    email
  }
  res.render('thank_you', templateVars);
});

module.exports = router;
