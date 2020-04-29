var enviroment = require('./enviroment.js');
var express = require('express');
var router = express.Router();
var connection = enviroment.connection;



router.get('/loginTwitter', function(req, res, next) {
    var twitterAPI = require('node-twitter-api');
    var twitter = new twitterAPI({
        consumerKey: enviroment.twitterConsumerKey,
        consumerSecret: enviroment.twitterConsumerSecret,
        callback: enviroment.twitterCallback
    });

    twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
        if (error) {
            console.log("Error getting OAuth request token : " + error);
        } else {
            res.send({'requestToken' : requestToken,
                    'requestTokenSecret' : requestTokenSecret});
        }
    });
});

router.get('/callbackTwitter', function(req, res, next) {

    var twitterAPI = require('node-twitter-api');
    var twitter = new twitterAPI({
        consumerKey: enviroment.twitterConsumerKey,
        consumerSecret: enviroment.twitterConsumerSecret,
        callback: enviroment.twitterCallback
    });

    twitter.getAccessToken(req.query.oauth_token, req.cookies.requestTokenSecret, req.query.oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
        if (error) {
            console.log(error);
        } else {
            res.send({ results : results });
        }
    });

    
    
    
  });

  router.get('/loginInsta', function(req, res, next) {
        res.send({
            url : `https://api.instagram.com/oauth/authorize/?client_id=${client_id}&redirect_uri=${redirection_url}&response_type=code`
        });
});

module.exports = router;
