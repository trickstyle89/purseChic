// PG database client/connection setup
const { Pool } = require('pg');
// const Client = pg.client;

// Pool is load balancing
// Client for individuals

const dbParams = {
  host: 'localhost',
  port: 5432,
  user: 'labber',
  password: 'labber',
  database: 'midterm'
};

const db = new Pool(dbParams);

db.connect();

module.exports = db;
