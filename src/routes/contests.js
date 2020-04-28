var enviroment = require('./enviroment.js');
var express = require('express');
var router = express.Router();
var connection = enviroment.connection;

/* GET contests listing. */
router.get('/all/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var pageId = req.params['pageId'];
    connection.query(`SELECT * FROM contest where status = 1 LIMIT ${10*pageId}`, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});

router.get('/contest/:contestId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var contestId = req.params['contestId'];
    connection.query(`SELECT * FROM contest where id = ${contestId}`, function(error,results,fields){
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
