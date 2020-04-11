var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'travel'
});

/* GET groups listing. */
router.get('/all/:pageId', function(req, res, next) {
  connection.connect(function(err) {   
    var pageId = req.params['pageId'];
    connection.query(`SELECT * FROM events where status = 1 LIMIT ${10*pageId}`, function(error,results,fields){
      res.send(results);
    });
  });
});

router.post('/remove', function(req, res, next) {
  connection.connect(function(err) {   
    var userId = req.body['userId'];
    connection.query('UPDATE events SET status = 0 where id = ' + userId, function(error,results,fields){
      res.send({
        status : success
      });
    });
  });
});

router.get('/event/:profileId', function(req, res, next) {
  connection.connect(function(err) {   
    var profileId = req.params['profileId'];
    connection.query('SELECT * FROM events where profile_id = ' + profileId, function(error,results,fields){
      res.send(results);
    });
  });
});

module.exports = router;
