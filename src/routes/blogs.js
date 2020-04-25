var connection = require('./enviroment.js');
var express = require('express');
var router = express.Router();

/* GET groups listing. */
router.get('/all/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var pageId = req.params['pageId'];
    conn.query(`
    
    SELECT * FROM (
      SELECT b.id , b.title , b.created_at , b.created_by , b.likes , b.comments , b.seen , b.blog_id , u.name created_by_name
      FROM blogs b , users u
      where b.status = 1 and b.created_by = u.id
      LIMIT ${5*pageId}
    ) AS t1

    UNION

    SELECT * FROM (
      SELECT b.id , b.title , b.created_at , b.created_by , b.likes , b.comments , b.seen , b.blog_id , 'admin' created_by_name
      FROM blogs b
      where b.status = 1 and b.created_by = -1
      LIMIT ${5*pageId}
    ) AS t2



    `, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});


router.post('/create', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var userId = req.body['userId'];
    conn.query('UPDATE blogs SET status = 0 where id = ' + userId, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
  });
});

router.post('/update', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var userId = req.body['userId'];
    conn.query('UPDATE blogs SET status = 0 where id = ' + userId, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
  });
});

router.post('/remove', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var userId = req.body['userId'];
    conn.query('UPDATE blogs SET status = 0 where id = ' + userId, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
  });
});

router.get('/blog/:blogId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var blogId = req.params['blogId'];
    conn.query('SELECT * FROM blogs where id = ' + blogId, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});

module.exports = router;
