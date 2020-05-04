var enviroment = require('./enviroment.js');
var express = require('express');
var router = express.Router();
var connection = enviroment.connection;

/* GET contests listing. */
router.get('/key/:name', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var name = req.params['name'];
    connection.query(`SELECT * FROM settings where name = '${name}'`, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});

router.get('/terms', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    connection.query(`SELECT * FROM settings where name = 'terms_ar' or name = 'terms_en'`, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});

router.post('/create', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var data = req.body['data'];
    conn.query(`INSERT INTO contest(name, details, created_at, end_at, status, contest_id) VALUES ('${data.name}' , '${data.details}' , '${data.created_at}' , '${data.end_at}' , 1 , 'SDF984')`, function(error,results,fields){
      conn.release();
      res.send({
        status : data.created_at
      });
    });
  });
});

router.post('/update', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var contestId = req.body['contestId'];
    var data = req.body['data'];
    conn.query(`UPDATE contest SET name = '${data.name}' , details = '${data.details}' ,  created_at = '${data.created_at}' ,  end_at = '${data.end_at}' where id = ${contestId}`, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
  });
});

router.post('/remove', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var contestId = req.body['contestId'];
    conn.query('UPDATE contest SET status = 0 where id = ' + contestId, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
  });
});


module.exports = router;
