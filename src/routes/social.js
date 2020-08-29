var enviroment = require('./enviroment.js');
var express = require('express');
var router = express.Router();
var connection = enviroment.connection;


router.get('/loginGoogle/:google_id', function(req, res, next) {
    var google_id = req.params['google_id'];
    connection.getConnection(function (err, conn) {
    if(err) {
        console.log(err);
    } else {
        conn.query(`SELECT * FROM users where google_id = '${google_id}'`, function(error,results,fields){
            conn.release();
            if(results.length > 0){
                res.send({
                    status : 'success',
                    token : results[0]['token'],
                    name : results[0]['name'],
                    id : results[0]['id'],
                    image : results[0]['image'],
                    email : results[0]['email'],
                    cover : results[0]['cover'],
                    about : results[0]['about'],
                    profile_id : results[0]['profile_id'],
                });
            } else {
              res.send({status : 'failed'});
            }
            });
        }
    });
});

router.get('/loginFb/:fb_id', function(req, res, next) {
    var fb_id = req.params['fb_id'];
    connection.getConnection(function (err, conn) {
    if(err) {
        console.log(err);
    } else {
        conn.query(`SELECT * FROM users where fb_id = '${fb_id}'`, function(error,results,fields){
            conn.release();
            if(results.length > 0){
                res.send({
                    status : 'success',
                    token : results[0]['token'],
                    name : results[0]['name'],
                    id : results[0]['id'],
                    image : results[0]['image'],
                    email : results[0]['email'],
                    cover : results[0]['cover'],
                    about : results[0]['about'],
                    profile_id : results[0]['profile_id'],
                });
            } else {
              res.send({status : 'failed'});
            }
        });
        }
    });
});

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
        console.log(results);
        if (error) {
            console.log(error);
        } else {
            connection.getConnection(function (err, conn) { 
                conn.query(`SELECT * FROM users where twitter_id = '${results.user_id}'`, function(error,results2,fields){
                    conn.release();
                    if(results2.length > 0){
                        res.redirect(`${req.cookies.source_link_twitter}?status=success&id=${results2[0]['id']}&name=${results2[0]['name']}&token=${results2[0]['token']}&email=${results2[0]['email']}&cover=${results2[0]['cover']}&about=${results2[0]['about']}&profile_id=${results2[0]['profile_id']}&image=${results2[0]['image']}`);
                    } else {
                        res.redirect(`${req.cookies.source_link_twitter}?status=failed&id=${results.user_id}&name=${results.screen_name}&token=${accessToken}`);
                    }
                });
            });
        }
    });
});

module.exports = router;
