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

router.post('/create', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var data = req.body['data'];
    conn.query(`
    INSERT INTO packages( name, details, price_month, price_year, status) VALUES 
    ('${data.name}','${data.details}',${data.price_month},${data.price_year},1)
    `, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
  });
});

router.post('/update', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var packageId = req.body['id'];
    var data = req.body['data'];
    conn.query(`UPDATE packages SET name = '${data.name}' , details='${data.details}' , price_month=${data.price_month} , price_year=${data.price_year} where id = ${packageId}` , function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
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
