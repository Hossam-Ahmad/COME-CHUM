const mysql = require('mysql');

// var connection = mysql.createPool({
//     connectionLimit : 10, // default = 10
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'travel'
// });

var connection = mysql.createPool({
    connectionLimit : 10, // default = 10
    host     : 'us-cdbr-iron-east-01.cleardb.net',
    user     : 'bad024e7c20c55',
    password : 'f1fb3c46',
    database : 'heroku_f0cb29b5b6f62bb'
});

var stripe_key = 'sk_test_E8ix1UwimY0qvL1oTbdqYK5T001ALXjDea';
// var stripe_key = 'sk_test_E8ix1UwimY0qvL1oTbdqYK5T001ALXjDea';

module.exports = {
    connection,
    stripe_key
};

