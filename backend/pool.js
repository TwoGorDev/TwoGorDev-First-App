// Imports
const { Pool } = require('pg');

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

// Create a clients pool
const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: PGPORT,
  ssl: {
    require: true,
  },
});

module.exports = pool;