var enviroment = require('./enviroment.js');
var express = require('express');
var router = express.Router();
var connection = enviroment.connection;

/* GET groups listing. */

router.get('/all/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var pageId = req.params['pageId'];
    conn.query(`
    SELECT * FROM interests
    LIMIT ${10*pageId}
    `, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});

router.post('/create', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var data = req.body['data'];
    conn.query(`INSERT INTO intersts(name_ar, name_en) VALUES
     ('${data.name_ar}' , '${data.name_en}' )`, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
  });
});

router.post('/update', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var interestId = req.body['interestId'];
    var data = req.body['data'];
    conn.query(`UPDATE interests SET name_ar = '${data.name_ar}' , name_en = '${data.name_en}' where id = ${interestId}`, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
  });
});

router.post('/remove', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var interestId = req.body['interestId'];
    conn.query('DELETE FROM interests where id = ' + interestId, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
  });
});

router.get('/interest/:interestId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var interestId = req.params['interestId'];
    conn.query('SELECT * FROM interests where id = ' + interestId, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});


module.exports = router;
