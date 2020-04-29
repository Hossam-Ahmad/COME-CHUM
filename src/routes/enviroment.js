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

var twitterConsumerKey = 'yA1IE48zVHNGIn2MndYAPhL5V';
var twitterConsumerSecret = '7jg6EhZq5oGS9wVxvMAMMGvZWMJW1bmOwlw537q77wGbQd3Vma';
var twitterCallback = 'http://localhost:4200/api/social/callbackTwitter';

var instaClientId = "0206abaa454a4858b1b2254cf71dfdf0";
var instaRedirectionUrl = "https://www.market-followers.com/logininstagramProcess";

module.exports = {
    connection,
    stripe_key,
    twitterConsumerKey,
    twitterConsumerSecret,
    twitterCallback,
    instaClientId,
    instaRedirectionUrl
};

