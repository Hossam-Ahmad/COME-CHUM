var connection = require('./enviroment.js');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/all/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    var pageId = req.params['pageId'];
    conn.query(`SELECT * FROM users where status = 1 LIMIT ${10*pageId}`, function(error,results,fields){
      conn.release();  
      res.send(results);
    });
  });
});

router.get('/user/:userId', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    var userId = req.params['userId'];
    connection.query(`SELECT * FROM users where id = ${userId}`, function(error,results,fields){
      conn.release();  
      res.send(results);
    });
  });
});

router.post('/remove', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    var userId = req.body['userId'];
    connection.query('UPDATE users SET status = 0 where id = ' + userId, function(error,results,fields){
      conn.release();  
      res.send({
        status : 'success'
      });
    });
  });
});

router.get('/user/:profileId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var profileId = req.params['profileId'];
    conn.query('SELECT * FROM users where profile_id = ' + profileId, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});

module.exports = router;
