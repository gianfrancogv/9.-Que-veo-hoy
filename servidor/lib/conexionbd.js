var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '642814Gv',
  database: 'queveohoy'
});

module.exports = connection;