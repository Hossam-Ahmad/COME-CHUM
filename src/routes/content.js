var enviroment = require('./enviroment.js');
var express = require('express');
var router = express.Router();
var connection = enviroment.connection;

/* GET contact chats listing. */
router.get('/services', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    conn.query(`SELECT * FROM services`, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});

router.get('/services/:serviceId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var serviceId = req.params['serviceId'];
    conn.query(`SELECT * FROM services where id = ${serviceId}`, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});


router.post('/services', function(req, res, next) {
    connection.getConnection(function (err, conn) {  
      var data = req.body['data'];
      conn.query(`UPDATE services SET title_ar = '${data.title_ar}' , subtitle_ar = '${data.subtitle_ar}' , title_en = '${data.title_en}' , subtitle_en = '${data.subtitle_en}' where id = ${data.id}`, function(error,results,fields){
        conn.release();
        res.send({
          status : 'success'
        });
      });
    });
  });

  router.get('/advantages', function(req, res, next) {
    connection.getConnection(function (err, conn) { 
      conn.query(`SELECT * FROM advantages`, function(error,results,fields){
        conn.release();
        res.send(results);
      });
    });
  });
  
  router.get('/advantages/:advantageId', function(req, res, next) {
    connection.getConnection(function (err, conn) { 
      var advantageId = req.params['advantageId'];
      conn.query(`SELECT * FROM advantages where id = ${advantageId}`, function(error,results,fields){
        conn.release();
        res.send(results);
      });
    });
  });
  
  
  router.post('/advantages', function(req, res, next) {
      connection.getConnection(function (err, conn) {  
        var data = req.body['data'];
        conn.query(`UPDATE advantages SET ar = '${data.ar}' , en = '${data.en}' where id = ${data.id}`, function(error,results,fields){
          conn.release();
          res.send({
            status : 'success'
          });
        });
      });
    });

    router.get('/about', function(req, res, next) {
      connection.getConnection(function (err, conn) {
        conn.query(`SELECT * FROM settings where name IN ('map', 'address', 'Fax', 'Phone', 'Whatsapp', 'Email', 'facebook', 'twitter', 'instagram')`, function(error,results,fields){
          conn.release();
          res.send(results);
        });
      });
    });

    router.post('/about', function(req, res, next) {
      connection.getConnection(function (err, conn) {  
        var data = req.body['data'];
        conn.query(`UPDATE settings SET value = '${data.map}'where name = 'map';
        UPDATE settings SET value = '${data.map}'where name = 'map';
        UPDATE settings SET value = '${data.address}'where name = 'address';
        UPDATE settings SET value = '${data.fax}'where name = 'fax';
        UPDATE settings SET value = '${data.phone}'where name = 'phone';
        UPDATE settings SET value = '${data.whatsapp}'where name = 'Whatsapp';
        UPDATE settings SET value = '${data.email}'where name = 'Email';
        UPDATE settings SET value = '${data.facebook}'where name = 'facebook';
        UPDATE settings SET value = '${data.twitter}'where name = 'twitter';
        UPDATE settings SET value = '${data.instagram}'where name = 'instagram';`, function(error,results,fields){
          conn.release();
          res.send({
            status : 'success'
          });
        });
      });
    });

module.exports = router;