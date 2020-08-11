const mysql = require('mysql');

//Mysql

// var connection = mysql.createPool({
//     connectionLimit : 10, // default = 10
//     multipleStatements: true,
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'travel'
// });
 
var connection = mysql.createPool({
    connectionLimit : 10, // default = 10
    multipleStatements: true,
    host     : 'us-cdbr-iron-east-01.cleardb.net',
    user     : 'bad024e7c20c55',
    password : 'f1fb3c46',
    database : 'heroku_f0cb29b5b6f62bb'
});

//Payment
var stripe_key = 'sk_test_E8ix1UwimY0qvL1oTbdqYK5T001ALXjDea';
// var stripe_key = 'sk_test_E8ix1UwimY0qvL1oTbdqYK5T001ALXjDea';

//Twitter
var twitterConsumerKey = 'yA1IE48zVHNGIn2MndYAPhL5V';
var twitterConsumerSecret = '7jg6EhZq5oGS9wVxvMAMMGvZWMJW1bmOwlw537q77wGbQd3Vma';
// var twitterCallback = 'http://localhost:4200/api/social/callbackTwitter';
var twitterCallback = 'http://chumtravel.herokuapp.com/api/social/callbackTwitter';

//Instagram
var instaClientId = "0206abaa454a4858b1b2254cf71dfdf0";
var instaRedirectionUrl = "https://www.market-followers.com/logininstagramProcess";

//Mail
var mail = {
    host : 'smtp.mailgun.org',
    port : '587',
    user : 'postmaster@sandboxe3ce04c6d0184688b18acdabb8bab39b.mailgun.org',
    pass : '15af3da7a16583eaf8bce09a0cdeb4ba-65b08458-0c9601f1',
    email : 'brad@sandboxe3ce04c6d0184688b18acdabb8bab39b.mailgun.org'
}

var domain = "https://chumtravel.herokuapp.com";

var twoCheckout = {
    Publishable : "6E800B98-97CD-4460-AAA7-01697C90D3FB",
    Private : "9C880AF0-B6C8-4943-9E02-E6CD84B5CAE1",
    sellerId : "901423527",
    secretWord : "MWVlZmFlMjktNTcxOS00MzI5LWJmMzEtNjE0NGI5Y2I0YjY2",
    sandbox : true
}



module.exports = {
    connection,
    stripe_key,
    twitterConsumerKey,
    twitterConsumerSecret,
    twitterCallback,
    instaClientId,
    instaRedirectionUrl,
    mail,
    domain,
    twoCheckout
};

