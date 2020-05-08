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
    conn.query(`SELECT * FROM (SELECT c.id , c.user1_id , c.user2_id , m.type, m.data , m.created_at , m.seen , m.chat_id , u.name , u.online , u.image FROM chat c , messages_chat m , users u WHERE c.id = m.chat_id AND (c.user1_id = ${userId} OR c.user2_id = ${userId}) AND ((u.id = c.user1_id AND u.id != ${userId})OR (u.id = c.user2_id AND u.id != ${userId})) ORDER BY m.created_at DESC LIMIT ${10*pageId}) AS t1 group by chat_id`, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});


router.get('/:chatId/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var chatId = req.params['chatId'];
    var pageId = req.params['pageId'];
    conn.query(`SELECT * FROM messages_chat where chat_id = ${chatId} ORDER BY created_at ASC LIMIT ${10*pageId}`, function(error,results,fields){
        conn.query(`UPDATE messages_chat SET seen = 1 where chat_id = ${chatId} ORDER BY created_at ASC LIMIT ${10*pageId}`, function(error,results2,fields){
          conn.release();
          res.send(results);
        });
    });
  });
});

router.get('/search/:query/:pageId', function(req, res, next) {
    connection.getConnection(function (err, conn) { 
      var query = req.params['query'];
      var pageId = req.params['pageId'];
      conn.query(`SELECT * FROM messages_chat where chat_id = ${chatId} ORDER BY created_at ASC LIMIT ${10*pageId}`, function(error,results,fields){
            conn.release();
            res.send(results);
      });
    });
  });


router.post('/send', function(req, res, next) {
  connection.getConnection(function (err, conn) {  
    var data = req.body['data'];
    var type = req.body['type'];
    var chatId = req.body['chatId'];
    conn.query(`INSERT INTO messages_chat(chat_id, type, data, seen, sender) VALUES (${chatId},${type},'${data}',1,1)`, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
  });
});

module.exports = router;
