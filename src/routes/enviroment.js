const mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'travel'
});

module.exports = connection;

// var connection = mysql.createConnection({
//   host     : 'mysql://bad024e7c20c55:f1fb3c46@us-cdbr-iron-east-01.cleardb.net/heroku_f0cb29b5b6f62bb?reconnect=true',
//   user     : 'bad024e7c20c55',
//   password : 'f1fb3c46',
//   database : 'heroku_f0cb29b5b6f62bb'
// });