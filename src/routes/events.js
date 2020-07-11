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

router.post('/search', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var type = req.body['type'];
    var pageId = req.body['pageId'];
    if(type == 'this_week') {
      conn.query(`select * from events where (DATE(happen_at) >= CURDATE() - INTERVAL 3 DAY) AND (DATE(happen_at) <= CURDATE() + INTERVAL 3 DAY) limit 10 offset ${(pageId-1)*10}`, function(error,results,fields){
        conn.release();
        res.send(results);
      });
    } else if(type == 'this_month') {
      conn.query(`select * from events where MONTH(happen_at) = MONTH(CURDATE()) limit 10 offset ${(pageId-1)*10}`, function(error,results,fields){
        conn.release();
        res.send(results);
      });
    } else if(type == 'this_year') {
      conn.query(`select * from events where YEAR(happen_at) = YEAR(CURDATE()) limit 10 offset ${(pageId-1)*10}`, function(error,results,fields){
        conn.release();
        res.send(results);
      });
    }else if(type == 'custom') {
      var d = req.body['date'].split('T')[0];
      console.log(`select * from events where DATE(happen_at) = '${d}'`); //------------------------------------------------------------- added line
      conn.query(`select * from events where DATE(happen_at) = '${d}'`, function(error,results,fields){
        conn.release();
        res.send(results);
      });
    }
  });
});

router.get('/event/:eventId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var eventId = req.params['eventId'];
    conn.query('SELECT * FROM events where event_id = ' + eventId, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});

module.exports = router;
