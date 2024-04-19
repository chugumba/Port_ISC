const mysql = require("mysql2/promise");
const dbConfig = require("../configs/db.config.js");

var connection = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});

module.exports = connection;