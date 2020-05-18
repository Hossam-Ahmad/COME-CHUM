var enviroment = require('./enviroment.js');
var express = require('express');
var router = express.Router();
var connection = enviroment.connection;

/* GET groups listing. */
router.get('/all/:pageId/:userId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var pageId = req.params['pageId'];
    var userId = req.params['userId'];
    conn.query(`
    
    SELECT * FROM (
      SELECT b.id , b.title , b.created_at, b.image , b.created_by , b.likes , b.comments , b.seen , b.blog_id , u.name created_by_name
      FROM blogs b , users u
      where b.status = 1 and b.created_by = u.id
      LIMIT ${5*pageId}
    ) AS t1

    UNION

    SELECT * FROM (
      SELECT b.id , b.title , b.created_at , b.image , b.created_by , b.likes , b.comments , b.seen , b.blog_id , 'admin' created_by_name
      FROM blogs b
      where b.status = 1 and b.created_by = -1
      LIMIT ${5*pageId}
    ) AS t2
    `, function(error,results,fields){
      let blogs_ids = [];
      results.forEach(result => blogs_ids.push(result.id));
      conn.query(`
        SELECT c.id comment_id, c.blog_id , c.user_id , c.text , c.image , c.created_at , u.name user_name , u.image user_image , u.profile_id, u.online
        FROM comments_blogs c , users u
        where blog_id in (${blogs_ids.toString()}) and u.id = c.user_id
        GROUP by blog_id
        `, function(error,results3,fields){
          results.forEach(result => {
            result.comments_arr = [];
            results3.forEach(result3 => {
              if(result3.post_id == result.id) {
                result.comments_arr.push(result3);
              }
            });
          });

          conn.query(`
          SELECT blog_id FROM likes_blogs
          where blog_id in (${blogs_ids.toString()}) and user_id = ${userId}
          `, function(error,results4,fields){

            results.forEach(result => {
              result.isliked = false;
              results4.forEach(result4 => {
                if(result4.blog_id == result.id) {
                  result.isliked = true;
                }
              });
            });

            conn.release();
            res.send(results);
          });
        });
    });
  });
});

router.get('/top', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    conn.query(`
    
    
    SELECT * FROM (
      SELECT b.id , b.title , b.created_at , b.created_by , b.likes , b.comments , b.seen , b.blog_id, b.image , u.name created_by_name
      FROM blogs b , users u
      where b.status = 1 and b.created_by = u.id
      order by b.seen DESC
      LIMIT 3
    ) AS t1
    UNION

    SELECT * FROM (
      SELECT b.id , b.title , b.created_at , b.created_by , b.likes , b.comments , b.seen , b.blog_id , b.image , 'admin' created_by_name
      FROM blogs b
      where b.status = 1 and b.created_by = -1
      order by b.seen DESC
      LIMIT 3
    ) AS t2

    ORDER by seen DESC
    limit 3



    `, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});

router.post('/create', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var data = req.body['data'];
    conn.query(`INSERT INTO blogs(title, body, image, created_by, likes, comments, seen, blog_id, status) VALUES
     ('${data.title}' , '${data.body}' , '' , -1 , 0 , 0 , 0 , 'UAGSD' , 1)`, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
  });
});

router.post('/update', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var blogId = req.body['blogId'];
    var data = req.body['data'];
    conn.query(`UPDATE blogs SET title = '${data.title}' , body = '${data.body}' where id = ${blogId}`, function(error,results,fields){
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
