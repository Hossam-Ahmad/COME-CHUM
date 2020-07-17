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

router.get('/:eventId/:userId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var eventId = req.params['eventId'];
    var userId = req.params['userId'];
    conn.query(`select id from events where event_id = '${eventId}'`, function(error,results,fields){
      conn.query(`select * from (SELECT id, name, members, cover, owner_id, owner_name, about, location, happen_at, lat, lng, event_id FROM events where status = 1 AND event_id = '${eventId}') as t1,
      (select IFNULL ((select status from event_members where event_id = ${results[0].id} and user_id = ${userId}) , 2) as joined) as t2`, function(error,results2,fields){
        conn.release();
        res.send(results2);
      });
    });
  });
});

router.get('/feed/:eventId/:userId/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var pageId = req.params['pageId'];
    var eventId = req.params['eventId'];
    var userId = req.params['userId'];
    conn.query(`
    SELECT * FROM (SELECT p.id , p.body , p.created_at , p.user_id , p.likes , p.comments , u.name, u.image, u.profile_id , u.online 
    FROM events_posts p , users u where p.status = 1 AND p.user_id = u.id AND p.event_id = ${eventId} ORDER BY p.created_at DESC
    LIMIT 10 OFFSET ${10*(pageId-1)}) AS t1
    `, function(error,results,fields){
      let posts_ids = [];
      if(results) {
        results.forEach(result => posts_ids.push(result.id));
        conn.query(`
        SELECT * FROM images_events where post_id in (${posts_ids.toString()}) and event_id = ${eventId}
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
          FROM comments_events c , users u
          where post_id in (${posts_ids.toString()}) and u.id = c.user_id and c.event_id = ${eventId}
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
            FROM likes_events
            where post_id in (${posts_ids.toString()}) and user_id = ${userId} and event_id = ${eventId}
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
    console.log(`INSERT INTO events_posts(user_id,event_id,body) VALUES 
    (${data.user_id},${data.event_id},'${escape(data.body)}')`); // --------------------------------------------- added line
    conn.query(`INSERT INTO events_posts(user_id,event_id,body) VALUES 
    (${data.user_id},${data.event_id},'${escape(data.body)}')`, function(error,results,fields){
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

router.post('/join', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var userId = req.body['userId'];
    var eventId = req.body['eventId'];

    conn.query(`DELETE from event_members where event_id = ${eventId} and user_id = ${userId};
    INSERT INTO event_members(user_id, event_id, status) VALUES(${userId},  ${eventId}, 1);
    UPDATE events SET members = members + 1 where id =  ${eventId};`, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });

    
    // DROP PROCEDURE IF EXISTS JoinEvent;

    // DELIMITER $$

    // CREATE PROCEDURE JoinEvent(
    //    IN userId INT, 
    //    IN eventId INT)
    // BEGIN


    //   IF (SELECT COUNT(*) FROM event_members
    //    WHERE event_id = eventId and user_id = userId) > 0 THEN
    //     UPDATE event_members SET status = 1 , created_at = NOW() where event_id = eventId and user_id = userId;
    //       ELSE
    //      INSERT INTO event_members(user_id, event_id, status) VALUES(userId, eventId, 1);
    //    END IF;
    //    UPDATE events SET members = members + (SELECT ROW_COUNT()) where id = eventId;
    // END$$

    // DELIMITER ;

    // conn.query(`CALL JoinEvent(${userId}, ${eventId});`, function(error,results,fields){
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
    var eventId = req.body['eventId'];
    conn.query(`UPDATE event_members SET status = 2 , created_at = NOW() where event_id = ${eventId} and user_id = ${userId};
    UPDATE events SET members = members - (SELECT ROW_COUNT()) where id = ${eventId};`, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
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
