var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
  host     : 'mysql://bad024e7c20c55:f1fb3c46@us-cdbr-iron-east-01.cleardb.net/heroku_f0cb29b5b6f62bb?reconnect=true',
  user     : 'bad024e7c20c55',
  password : 'f1fb3c46',
  database : 'heroku_f0cb29b5b6f62bb'
});

/* GET users listing. */
router.get('/all/:pageId', function(req, res, next) {
  connection.connect(function(err) {   
    var pageId = req.params['pageId'];
    connection.query(`SELECT * FROM users where status = 1 LIMIT ${10*pageId}`, function(error,results,fields){
      res.send(results);
    });
  });
});

router.get('/user/:userId', function(req, res, next) {
  connection.connect(function(err) {   
    var userId = req.params['userId'];
    connection.query(`SELECT * FROM users where id = ${userId}`, function(error,results,fields){
      res.send(results);
    });
  });
});

router.post('/remove', function(req, res, next) {
  connection.connect(function(err) {   
    var userId = req.body['userId'];
    connection.query('UPDATE users SET status = 0 where id = ' + userId, function(error,results,fields){
      res.send({
        status : 'success'
      });
    });
  });
});

router.get('/user/:profileId', function(req, res, next) {
  connection.connect(function(err) {   
    var profileId = req.params['profileId'];
    connection.query('SELECT * FROM users where profile_id = ' + profileId, function(error,results,fields){
      res.send(results);
    });
  });
});

module.exports = router;
