// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const messagesRouter = require('./routes/message_routes');
const usersRouter = require('./routes/users_routes'); // working on this
// CREATE NEW FILE TO EACH ROUTE AND CONNECT IT USING APP.USE
const addProductsRouter = require('./routes/add_listing_routes');
const registerRouter = require('./routes/register_routes');
const thankyouRouter = require('./routes/thank_you_routes')
const productsRouter = require('./routes/products_routes');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`

app.use('/my_listing', productsRouter);
app.use('/register', registerRouter);
app.use('/thank_you', thankyouRouter);
app.use('/add_listing', addProductsRouter);

// *** working on this. First param is route and then back to the router files.
// *** whatever route you use here will be stripped on the other end.
// watch Andy's video at 14 minutes to understand this part.
app.use('/', usersRouter);
app.use('/main', productsRouter);
app.use('/users', messagesRouter);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
