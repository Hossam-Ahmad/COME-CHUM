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
              if(result3.blog_id == result.id) {
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

router.get('/all/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    var pageId = req.params['pageId'];
    conn.query(`
    
    
    SELECT * FROM (
      SELECT b.id , b.title , b.created_at , b.created_by , b.likes , b.comments , b.seen , b.blog_id, b.image , u.name created_by_name
      FROM blogs b , users u
      where b.status = 1 and b.created_by = u.id
      order by b.seen DESC
      LIMIT 5
    ) AS t1
    UNION

    SELECT * FROM (
      SELECT b.id , b.title , b.created_at , b.created_by , b.likes , b.comments , b.seen , b.blog_id , b.image , 'admin' created_by_name
      FROM blogs b
      where b.status = 1 and b.created_by = -1
      order by b.seen DESC
      LIMIT 5
    ) AS t2

    ORDER by seen DESC
    limit ${10*pageId}



    `, function(error,results,fields){
      conn.release();
      res.send(results);
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

router.post('/like', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var blogId = req.body['blogId'];
    var userId = req.body['userId'];

    conn.query(`select * from likes_blogs where user_id = ${userId} AND blog_id = ${blogId}`
    , function(error,results,fields){
      if(results) {
        conn.query(`UPDATE blogs SET likes = likes + 1 where id = ${blogId};
        INSERT INTO likes_blogs (user_id , blog_id) VALUES (${userId},${blogId});
        ` , function(error,results,fields){
          conn.release();
          res.send({
            status : 'success'
          });
        });

      } else {
        conn.release();
          res.send({
            status : 'failed'
          });
      }
    }); 
  });
});

router.post('/dislike', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var blogId = req.body['blogId'];
    var userId = req.body['userId'];
    conn.query(`select from likes_blogs where user_id = ${userId} AND blog_id = ${blogId}
    `, function(error,results,fields){

      if(results == undefined) {

        conn.query(`UPDATE likes_blogs SET likes = likes - 1 where id = ${blogId};
        DELETE FROM likes_blogs where user_id = ${userId} AND blog_id = ${blogId}
        `, function(error,results,fields){
          conn.release();
          res.send({
            status : 'success'
          });
        });

      } else {
        conn.release();
        res.send({
          status : 'failed'
        });
      }

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

router.get('/blog/:blogId/:userId', function(req, res, next) {
  let response = {};
  connection.getConnection(function (err, conn) { 
    var blogId = req.params['blogId'];
    var userId = req.params['userId'];
    conn.query(`SELECT * FROM blogs where blog_id = '${blogId}'`, function(error,results,fields){
      conn.query(`
      SELECT c.id comment_id, c.blog_id , c.user_id , c.text , c.image , c.created_at , u.name user_name , u.image user_image , u.profile_id, u.online
      FROM comments_blogs c , users u
      where blog_id = ${results[0].id} and u.id = c.user_id
      GROUP by blog_id
      `, function(error,results2,fields){
        conn.query(`
        SELECT count(*) as total 
        FROM likes_blogs
        where blog_id = ${results[0].id} and user_id = ${userId}
        `, function(error,results3,fields){
          response.data = results[0];
          response.data.comments_arr = results2;
          response.data.isliked = results3[0]['total'] > 0;
          conn.release();
          res.send(response);
      });
      });
    });
  });
});

router.post('/create_comment', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var blogId = req.body['blogId'];
    var text = req.body['text'];
    var userId = req.body['userId'];
    conn.query(`INSERT INTO comments_blogs(blog_id, user_id, text, image) VALUES 
    (${blogId} , ${userId} , '${text}' , '')
    `, function(error,results,fields){
    conn.query(`UPDATE blogs SET comments = comments + 1 where id = ${blogId}`, function(error,results,fields){
        conn.release();
        res.send({
          status : 'success'
        });
      });
    });
  });
});

router.get('/load_comments/:blogId/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var blogId = req.params['blogId'];
    var pageId = req.params['pageId'];
    conn.query(`
    SELECT c.id comment_id , c.blog_id , c.user_id , c.text , c.image , c.created_at , u.name user_name , u.image user_image , u.profile_id, u.online
    FROM comments_blogs c , users u
    where blog_id = ${blogId} and u.id = c.user_id
    limit 10 OFFSET ${10*(pageId-1)}
    `, function(error,results,fields){
      conn.release();
        res.send({
          results
        });
    });
  });
});

module.exports = router;
