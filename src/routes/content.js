var enviroment = require('./enviroment.js');
var express = require('express');
var router = express.Router();
var connection = enviroment.connection;

/* GET contact chats listing. */

router.get('/home', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    let response = {};
    conn.query(`SELECT * FROM settings where name IN ('map', 'address', 'Fax', 'Phone', 'Whatsapp', 'Email', 'facebook', 'twitter', 'instagram')`, function(error,results,fields){
      response.data = results
      conn.query(`SELECT * FROM events limit 3`, function(error,results2,fields){
        response.events = results2
        conn.query(`SELECT * FROM services`, function(error,results3,fields){
          response.benefits = results3
          conn.query(`SELECT * FROM client_reviews`, function(error,results4,fields){
            response.reviews = results4
            conn.release();
            res.send(response);
          });
        });
      });
    });
  });
});

router.get('/services/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var pageId = req.params['pageId'];
    conn.query(`SELECT * FROM services limit ${10*pageId}`, function(error,results,fields){
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

  router.get('/advantages/:pageId', function(req, res, next) {
    connection.getConnection(function (err, conn) { 
      var pageId = req.params['pageId'];
      conn.query(`SELECT * FROM advantages limit ${10*pageId}`, function(error,results,fields){
        conn.release();
        res.send(results);
      });
    });
  });
  
  router.get('/advantages/advantage/:advantageId', function(req, res, next) {
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