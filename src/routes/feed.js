var enviroment = require('./enviroment.js');
var express = require('express');
var router = express.Router();
var connection = enviroment.connection;


router.get('/all/:userId/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var pageId = req.params['pageId'];
    var userId = req.params['userId'];
    conn.query(`
    SELECT * FROM (SELECT p.id , p.title , p.body , p.created_at , p.user_id , p.likes , p.comments , p.persons , p.date_from , p.date_to , p.country ,p.city, u.name, u.image, u.profile_id , u.online 
    FROM posts p , users u where p.status = 1 AND p.user_id = u.id  AND p.status = 1 AND p.user_id != ${userId} ORDER BY p.created_at DESC
    LIMIT ${10*pageId}) AS t1
    `, function(error,results,fields){
      let posts_ids = [];
      results.forEach(result => posts_ids.push(result.id));
      conn.query(`
      SELECT * FROM images where post_id in (${posts_ids.toString()})
      `, function(error,results2,fields){
        results.forEach(result => {
          result.images = [];
          results2.forEach(result2 => {
            if(result2.post_id == result.id) {
              result.images.push(result2);
            }
          });
        });
        conn.query(`
        SELECT c.post_id , c.user_id , c.text , c.image , c.created_at , u.name user_name , u.image user_image , u.profile_id, u.online
        FROM comments c , users u
        where post_id in (${posts_ids.toString()}) and u.id = c.user_id
        GROUP by post_id
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
          SELECT post_id
          FROM likes
          where post_id in (${posts_ids.toString()}) and user_id = ${userId}
          `, function(error,results4,fields){

            results.forEach(result => {
              result.isliked = false;
              results4.forEach(result4 => {
                if(result4.post_id == result.id) {
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
});


router.post('/create', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var data = req.body['data'];
    conn.query(`INSERT INTO posts(user_id,body) VALUES 
    (${data.user_id},'${data.body}')`, function(error,results,fields){
    //   conn.query(`INSERT INTO posts(user_id,title,body,persons,date_from,date_to,country,city) VALUES 
    // (${data.user_id},'${data.text}','${data.body}',${data.persons},'${data.date_from}','${data.date_to}',${data.country},${data.city})`, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
  });
});

router.post('/create_comment', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var postId = req.body['postId'];
    var text = req.body['text'];
    var userId = req.body['userId'];
    conn.query(`INSERT INTO comments(post_id, user_id, text, image) VALUES 
    (${postId} , ${userId} , '${text}' , '')
    `, function(error,results,fields){
    conn.query(`UPDATE posts SET comments = comments + 1 where id = ${postId}`, function(error,results,fields){
        conn.release();
        res.send({
          status : 'success'
        });
      });
    });
  });
});

router.post('/like', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var postId = req.body['postId'];
    var userId = req.body['userId'];

    conn.query(`select from likes where user_id = ${userId} AND post_id = ${postId}`
    , function(error,results,fields){
      if(results == undefined) {
        conn.query(`UPDATE posts SET likes = likes + 1 where id = ${postId};
        INSERT INTO likes (user_id , post_id) VALUES (${userId},${postId});
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
    var postId = req.body['postId'];
    var userId = req.body['userId'];
    conn.query(`select from likes where user_id = ${userId} AND post_id = ${postId}
    `, function(error,results,fields){

      if(results == undefined) {

        conn.query(`UPDATE posts SET likes = likes - 1 where id = ${postId};
        DELETE FROM likes where user_id = ${userId} AND post_id = ${postId}
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
    var postId = req.body['postId'];
    var data = req.body['data'];
    conn.query(`UPDATE blogs SET title = '${data.title}' , body = '${data.body}' , persons = ${data.persons} , date_from = '${data.date_from}' , date_to = '${data.date_to}' , country = ${data.country} , city = ${data.city} where id = ${postId}`, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
  });
});

router.post('/remove', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var postId = req.body['postId'];
    conn.query('UPDATE posts SET status = 0 where id = ' + postId, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
  });
});

router.get('/post/:postId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var postId = req.params['postId'];
    conn.query('SELECT * FROM posts where id = ' + postId, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});

module.exports = router;
