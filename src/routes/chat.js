var enviroment = require('./enviroment.js');
var express = require('express');
var router = express.Router();
var connection = enviroment.connection;

/* GET contact chats listing. */
router.get('/all/:type/:pageId/:userId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var type = req.params['type'];
    var pageId = req.params['pageId'];
    var userId = req.params['userId'];
    conn.query(`SELECT c.id , c.user1_id , c.user2_id , c.last_message_type, c.last_message, c.last_message_created_at , u.name , u.online , u.image, u.last_logout 
    FROM chat c , users u 
    WHERE (c.user1_id = ${userId} OR c.user2_id = ${userId}) AND ((u.id = c.user1_id AND u.id != ${userId})OR (u.id = c.user2_id AND u.id != ${userId})) 
    ORDER BY c.last_message_created_at DESC LIMIT 10 OFFSET ${10*(pageId-1)}`, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});

router.get('/:chatId/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var chatId = req.params['chatId'];
    var pageId = req.params['pageId'];
    conn.query(`select * FROM (SELECT * FROM messages_chat where chat_id = ${chatId} ORDER BY created_at DESC LIMIT 10 OFFSET ${10*(pageId-1)}) AS result ORDER BY created_at ASC`, function(error,results,fields){
        conn.query(`UPDATE messages_chat SET seen = 1 where chat_id = ${chatId} ORDER BY created_at DESC LIMIT 10 OFFSET ${10*(pageId-1)}`, function(error,results2,fields){
          conn.release();
          res.send(results);
        });
    });
  });
});

router.get('/search/:query/:userId/:pageId', function(req, res, next) {
    connection.getConnection(function (err, conn) { 
      var query = req.params['query'];
      var userId = req.params['userId'];
      var pageId = req.params['pageId'];

      conn.query(`SELECT c.id , c.user1_id , c.user2_id , c.last_message_type, c.last_message, c.last_message_created_at , u.name , u.online , u.image, u.last_logout 
      FROM chat c , users u 
      WHERE ((c.user1_id = ${userId} AND c.user2_id = u.id) OR (c.user2_id = ${userId} AND c.user1_id = u.id)) AND u.name like '%${query}%'
      ORDER BY c.last_message_created_at DESC LIMIT 10 OFFSET ${10*(pageId-1)}`, function(error,results,fields){
        conn.release();
        res.send(results);
      });

    });
});

router.post('/create', function(req, res, next) {
  connection.getConnection(function (err, conn) {  
    var userId = req.body['userId'];
    var userId2 = req.body['userId2'];
    var message = req.body['message'];
    var chatId = 0;
    conn.query(`SELECT * FROM chat where (user1_id = ${userId} AND user2_id = ${userId2}) OR (user1_id = ${userId2} AND user2_id = ${userId})`, function(error,results,fields){
      console.log(results);
      if(results) {
        console.log('not found');
        conn.query(`INSERT INTO chat(user1_id, user2_id) VALUES (${userId},${userId2});
        `, function(error,results2,fields){
          console.log(results2)
          chatId = results2.insertId;
          conn.query(`INSERT INTO messages_chat(chat_id, type, data, seen, sender_id) VALUES (${chatId},0,'${message}',0,${userId})`, function(error,results2,fields){
            conn.release();
            res.send({
              status : 'success',
            });
          });
        });
      } else {
        chatId = results[0].id;
        conn.query(`INSERT INTO messages_chat(chat_id, type, data, seen, sender_id) VALUES (${chatId},0,'${message}',0,${userId})`, function(error,results2,fields){
          conn.release();
          res.send({
            status : 'success',
          });
        });
      }
    });
  });
});

router.post('/send', function(req, res, next) {
  connection.getConnection(function (err, conn) {  
    var data = req.body['data'];
    var type = req.body['type'];
    var chatId = req.body['chatId'];
    var userId = req.body['userId'];
    conn.query(`INSERT INTO messages_chat(chat_id, type, data, seen, sender_id) VALUES (${chatId},${type},'${data}',0,${userId})`, function(error,results,fields){
      conn.query(`UPDATE chat SET last_message = '${data}' , last_message_type = ${type} where id = ${chatId};
      select * from 
      (select user1_id , user2_id from chat WHERE id = ${chatId}) as t1,
      (select name, image from users where id = ${userId}) as t2;`, function(error,results2,fields){
        var notified_user = results2[1][0].user1_id;
        if(userId == notified_user) {
          notified_user = results2[1][0].user2_id;
        }
        conn.query(`INSERT INTO notifications(user_id, text, translation, type, seen, entry_name, entry_id, entry_image) VALUES (${userId}, '${data}','send_message_to_you',1,0,'${results2[1][0].name}',${chatId},'${results2[1][0].image}')`, function(error,results,fields){
          conn.release();
          const io = req.app.locals.io;
          io.emit(`chat${chatId}`, { data, type, chatId, userId });
          io.emit(`user${notified_user}`, { text: data, translation : 'send_message_to_you', type : 1, entry_id : chatId, user_id : userId });
          res.send({
            status : 'success',
          });
        });
      });
    });
  });
});

module.exports = router;
