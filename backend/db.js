const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "sistemalanchonete",
  password: "root",
  port: 5432,
});

module.exports = pool;
