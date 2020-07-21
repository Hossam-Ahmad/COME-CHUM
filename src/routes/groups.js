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
    LIMIT 10 offset ${10*(pageId-1)}`, function(error,results,fields){
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

router.get('/:groupId/:userId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var groupId = req.params['groupId'];
    var userId = req.params['userId'];
    conn.query(`select id from groups where group_id = '${groupId}'`, function(error,results,fields){
      conn.query(`select * from (SELECT id, name, members, cover, owner_id, owner_name, about, location, group_id FROM groups where status = 1 AND group_id = '${groupId}') as t1,
      (select IFNULL ((select status from group_members where group_id = ${results[0].id} and user_id = ${userId}) , 2) as joined) as t2`, function(error,results2,fields){
        conn.release();
        res.send(results2);
      });
    });
  });
});

router.get('/feed/:groupId/:userId/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var pageId = req.params['pageId'];
    var groupId = req.params['groupId'];
    var userId = req.params['userId'];
    conn.query(`
    SELECT * FROM (SELECT p.id , p.body , p.created_at , p.user_id , p.likes , p.comments , u.name, u.image, u.profile_id , u.online 
    FROM groups_posts p , users u where p.status = 1 AND p.user_id = u.id AND p.group_id = ${groupId} ORDER BY p.created_at DESC
    LIMIT 10 OFFSET ${10*(pageId-1)}) AS t1
    `, function(error,results,fields){
      let posts_ids = [];
      if(results) {
        results.forEach(result => posts_ids.push(result.id));
        conn.query(`
        SELECT * FROM images_groups where post_id in (${posts_ids.toString()}) and group_id = ${groupId}
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
          SELECT c.id comment_id, c.post_id , c.user_id , c.text , c.image , c.created_at , u.name user_name , u.image user_image , u.profile_id, u.online
          FROM comments_groups c , users u
          where post_id in (${posts_ids.toString()}) and u.id = c.user_id and c.group_id = ${groupId}
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
            FROM likes_groups
            where post_id in (${posts_ids.toString()}) and user_id = ${userId} and group_id = ${groupId}
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
      } else {
        conn.release();
        res.send([]);
      }
    });
  });
});

router.post('/feed/create', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var data = req.body['data'];
    console.log(`INSERT INTO groups_posts(user_id,group_id,body) VALUES 
    (${data.user_id},${data.group_id},'${escape(data.body)}')`); // --------------------------------------------- added line
    conn.query(`INSERT INTO groups_posts(user_id,group_id,body) VALUES 
    (${data.user_id},${data.group_id},'${escape(data.body)}')`, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
  });
});

router.post('/join', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var userId = req.body['userId'];
    var groupId = req.body['groupId'];

    conn.query(`DELETE from group_members where group_id = ${groupId} and user_id = ${userId};
    INSERT INTO group_members(user_id, group_id, status) VALUES(${userId},  ${groupId}, 1);
    UPDATE groups SET members = members + 1 where id =  ${groupId};`, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });

    
    // DROP PROCEDURE IF EXISTS JoinGroup;

    // DELIMITER $$

    // CREATE PROCEDURE JoinGroup(
    //    IN userId INT, 
    //    IN groupId INT)
    // BEGIN


    //   IF (SELECT COUNT(*) FROM event_members
    //    WHERE event_id = groupId and user_id = userId) > 0 THEN
    //     UPDATE event_members SET status = 1 , created_at = NOW() where event_id = groupId and user_id = userId;
    //       ELSE
    //      INSERT INTO event_members(user_id, event_id, status) VALUES(userId, groupId, 1);
    //    END IF;
    //    UPDATE events SET members = members + (SELECT ROW_COUNT()) where id = groupId;
    // END$$

    // DELIMITER ;

    // conn.query(`CALL JoinGroup(${userId}, ${groupId});`, function(error,results,fields){
    //   conn.release();
    //   res.send({
    //     status : 'success'
    //   });
    // });
  });
});

router.post('/leave', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var userId = req.body['userId'];
    var groupId = req.body['groupId'];
    conn.query(`UPDATE group_members SET status = 2 , created_at = NOW() where group_id = ${groupId} and user_id = ${userId};
    UPDATE groups SET members = members - (SELECT ROW_COUNT()) where id = ${groupId};
    UPDATE groups_posts SET status = 2 where group_id = ${groupId} and user_id = ${userId}`, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
  });
});

router.get('/group/feed/images/:groupId/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var groupId = req.params['groupId'];
    var pageId = req.params['pageId'];
    console.log(`SELECT * FROM images_groups where group_id = ${groupId} limit 10 offset ${10*(pageId-1)}`);//----------------------------------------------------- added line
    conn.query(`SELECT * FROM images_groups where group_id = ${groupId} limit 10 offset ${10*(pageId-1)}`, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});

router.get('/group/feed/videos/:groupId/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var groupId = req.params['groupId'];
    var pageId = req.params['pageId'];
    conn.query(`SELECT * FROM videos_groups where group_id = ${groupId} limit 10 offset ${10*(pageId-1)}`, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});

router.post('/feed/like', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var postId = req.body['postId'];
    var userId = req.body['userId'];
    var groupId = req.body['groupId'];

    conn.query(`select from likes_groups where user_id = ${userId} AND post_id = ${postId} AND group_id=${groupId}`
    , function(error,results,fields){
      if(results == undefined) {
        conn.query(`UPDATE groups_posts SET likes = likes + 1 where id = ${postId};
        INSERT INTO likes_groups (user_id , post_id, group_id) VALUES (${userId},${postId},${groupId});
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

router.post('/feed/dislike', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var postId = req.body['postId'];
    var userId = req.body['userId'];
    var groupId = req.body['groupId'];

    conn.query(`select from likes_groups where user_id = ${userId} AND post_id = ${postId} AND group_id = ${groupId}
    `, function(error,results,fields){

      if(results == undefined) {

        conn.query(`UPDATE groups_posts SET likes = likes - 1 where id = ${postId};
        DELETE FROM likes_groups where user_id = ${userId} AND post_id = ${postId}
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

router.post('/feed/create_comment', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var postId = req.body['postId'];
    var text = req.body['text'];
    var userId = req.body['userId'];
    var groupId = req.body['groupId'];

    conn.query(`INSERT INTO comments_groups(post_id, user_id, group_id, text, image) VALUES 
    (${postId} , ${userId}, ${groupId} , '${text}' , '')
    `, function(error,results,fields){
    conn.query(`UPDATE groups_posts SET comments = comments + 1 where id = ${postId}`, function(error,results,fields){
        conn.release();
        res.send({
          status : 'success'
        });
      });
    });
  });
});

router.get('/feed/load_comments/:groupId/:postId/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var postId = req.params['postId'];
    var pageId = req.params['pageId'];
    var groupId = req.params['groupId'];
    conn.query(`
    SELECT c.id comment_id , c.post_id , c.user_id , c.text , c.image , c.created_at , u.name user_name , u.image user_image , u.profile_id, u.online
    FROM comments_groups c , users u
    where post_id = ${postId} and u.id = c.user_id and group_id = ${groupId}
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
