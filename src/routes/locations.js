var enviroment = require('./enviroment.js');
var express = require('express');
var router = express.Router();
var connection = enviroment.connection;

/* GET groups listing. */

router.get('/countries/:language', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var language = 'name_'+req.params['language'];
    conn.query(`
    SELECT id , ${language} FROM countries
    `, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});

router.get('/country/:countryId/:language', function(req, res, next) {
    connection.getConnection(function (err, conn) { 
      var language = 'name_'+req.params['language'];
      var countryId = req.params['countryId'];
      conn.query(`
      SELECT id , ${language} FROM countries
      WHERE ID = ${countryId}
      `, function(error,results,fields){
        conn.release();
        res.send(results);
      });
    });
});

router.get('/cities/:countryId/:language', function(req, res, next) {
    connection.getConnection(function (err, conn) { 
      var countryId = req.params['countryId'];
      var language = 'name_'+req.params['language'];
      conn.query(`
      SELECT id , ${language} FROM cities
      WHERE country_id = ${countryId}
      `, function(error,results,fields){
        conn.release();
        res.send(results);
      });
    });
});

router.get('/city/:cityId/:language', function(req, res, next) {
    connection.getConnection(function (err, conn) { 
      var cityId = req.params['cityId'];
      var language = 'name_'+req.params['language'];
      conn.query(`
      SELECT id , ${language} FROM cities
      WHERE ID = ${cityId}
      `, function(error,results,fields){
        conn.release();
        res.send(results);
      });
    });
});

module.exports = router;
