var mysql = require("mysql2");
var dotenv = require("dotenv").config({ path: "./process.env" });
var pool = mysql.createPool({
  connectionLimit: dotenv.parsed.LIMMITACOUT,
  host: dotenv.parsed.HOST,
  user: dotenv.parsed.USER,
  password: dotenv.parsed.PASSWORD,
  database: dotenv.parsed.DB,
});

pool.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
  if (error) throw error;
  console.log("connect: ", results[0].solution);
});

module.exports = pool;
