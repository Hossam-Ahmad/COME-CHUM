var enviroment = require('./enviroment.js');
var express = require('express');
var router = express.Router();
var connection = enviroment.connection;

/* GET groups listing. */

router.get('/all/:userId/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var userId = req.params['userId'];
    var pageId = req.params['pageId'];
    conn.query(`
    SELECT * FROM notifications where user_id = ${userId} limit 10 offset ${10*(pageId-1)}
    `, function(error,results,fields){
      conn.release();
      console.log(`SELECT * FROM notifications where user_id = ${userId} limit 10 offset ${10*(pageId-1)}`); //----------------------------------------------------- add line
      res.send(results);
    });
  });
});

module.exports = router;
