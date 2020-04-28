var enviroment = require('./enviroment.js');
var express = require('express');
var router = express.Router();
var connection = enviroment.connection;

/* GET groups listing. */
router.get('/all/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var pageId = req.params['pageId'];
    conn.query(`SELECT * FROM events where status = 1 LIMIT ${10*pageId}`, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});

router.post('/remove', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var userId = req.body['userId'];
    conn.query('UPDATE events SET status = 0 where id = ' + userId, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
  });
});

router.get('/event/:profileId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var profileId = req.params['profileId'];
    conn.query('SELECT * FROM events where profile_id = ' + profileId, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});

module.exports = router;
