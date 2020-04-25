var connection = require('./enviroment.js');
var express = require('express');
var router = express.Router();

/* GET groups listing. */
router.get('/all/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var pageId = req.params['pageId'];
    conn.query(`SELECT * FROM packages where status = 1 LIMIT ${10*pageId}`, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});

router.post('/remove', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var packageId = req.body['packageId'];
    conn.query('UPDATE packages SET status = 0 where id = ' + packageId, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
  });
});

router.get('/package/:packageId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var packageId = req.params['packageId'];
    conn.query('SELECT * FROM packages where id = ' + packageId, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});

module.exports = router;
