var enviroment = require('./enviroment.js');
var express = require('express');
var router = express.Router();
var connection = enviroment.connection;

/* GET groups listing. */
router.get('/all/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) {   
    var pageId = req.params['pageId'];
    conn.query(`SELECT * FROM groups where status = 1 LIMIT ${10*pageId}`, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});

router.get('/members/:groupId/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var groupId = req.params['groupId'];
    var pageId = req.params['pageId'];

    connection.query(`SELECT m.user_id , u.name , u.image
    from groups_members m , users u 
    where m.group_id = ${groupId} and m.status = 1 and m.user_id = u.id
    ORDER BY m.created_at DESC
    LIMIT ${10*pageId}`, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});

router.post('/remove', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var userId = req.body['userId'];
    conn.query('UPDATE groups SET status = 0 where id = ' + userId, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
  });
});

router.get('/group/:profileId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var profileId = req.params['profileId'];
    conn.query('SELECT * FROM groups where profile_id = ' + profileId, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});

module.exports = router;
