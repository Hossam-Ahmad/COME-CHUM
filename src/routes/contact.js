var enviroment = require('./enviroment.js');
var express = require('express');
var router = express.Router();
var connection = enviroment.connection;

/* GET contact chats listing. */
router.get('/all/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var pageId = req.params['pageId'];
    conn.query(`SELECT * FROM 
    (
    SELECT c.id , c.user_id , c.type "user_type" , m.type "message_type" , m.data , m.created_at , m.seen , m.contact_id , u.name
    FROM contact c , messages_contact m , users u
    WHERE c.id = m.contact_id AND c.user_id = u.id AND c.type = 1
    ORDER BY m.created_at DESC
    LIMIT ${10*pageId}
    )
    as t1
    group by contact_id
    
    UNION
    
    SELECT * FROM 
    (
    SELECT cc.id , cc.user_id , cc.type "user_type" , mm.type "message_type" , mm.data , mm.created_at , mm.seen , mm.contact_id , uu.name
    FROM contact cc , messages_contact mm , unsigned_users uu
    WHERE cc.id = mm.contact_id AND cc.user_id = uu.id AND cc.type = 0
    ORDER BY mm.created_at DESC
    LIMIT ${10*pageId}
    )
    as t2
    group by contact_id`, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});


router.get('/:contactId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var contactId = req.params['contactId'];
    conn.query(`SELECT * FROM 
    (
    SELECT c.id , c.user_id , c.type "user_type" , m.type "message_type" , m.data , m.created_at , m.seen , m.contact_id , u.name , u.image
    FROM contact c , messages_contact m , users u
    WHERE c.id = m.contact_id AND c.user_id = u.id AND c.type = 1 AND c.id = ${contactId}
    ORDER BY m.created_at DESC
    LIMIT 1
    )
    as t1
    group by contact_id
    
    UNION
    
    SELECT * FROM 
    (
    SELECT cc.id , cc.user_id , cc.type "user_type" , mm.type "message_type" , mm.data , mm.created_at , mm.seen , mm.contact_id , uu.name , uu.name "image"
    FROM contact cc , messages_contact mm , unsigned_users uu
    WHERE cc.id = mm.contact_id AND cc.user_id = uu.id AND cc.type = 0 AND cc.id = ${contactId}
    ORDER BY mm.created_at DESC
    LIMIT 1
    )
    as t2
    group by contact_id`, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});

router.get('/:contactId/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) {   
    var contactId = req.params['contactId'];
    var pageId = req.params['pageId'];
    conn.query(`SELECT * FROM messages_contact where contact_id = ${contactId} ORDER BY created_at ASC LIMIT ${10*pageId}`, function(error,results,fields){
      conn.query(`UPDATE messages_contact SET seen = 1 where contact_id = ${contactId} ORDER BY created_at ASC LIMIT ${10*pageId}`, function(error,results2,fields){
        conn.release();
        res.send(results);
      });
    });
  });
});

router.get('/unauthenticated/:userId/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) {   
    var userId = req.params['userId'];
    var pageId = req.params['pageId'];
    conn.query(`select * FROM
      messages_contact m , contact c 
      where c.user_id = ${userId} and m.contact_id = c.id and c.type = 0
      ORDER by m.created_at ASC
      limit ${10*pageId}`, function(error,results,fields){
      if(results.length > 0){
        conn.query(`UPDATE messages_contact SET seen = 1 where contact_id = ${results[0].contact_id} ORDER BY created_at ASC LIMIT ${10*pageId}`, function(error,results2,fields){
          conn.release();
          res.send(results);
        });
      } else {
        res.send(results);
      }
    });
  });
});

router.post('/send', function(req, res, next) {
  connection.getConnection(function (err, conn) {  
    var data = req.body['data'];
    var type = req.body['type'];
    var contactId = req.body['contactId'];
    var sender = req.body['sender'];
    conn.query(`INSERT INTO messages_contact(contact_id, type, data, seen, sender) VALUES (${contactId}, ${type}, '${data}', 1, ${sender})`, function(error,results,fields){
      conn.release();
      const io = req.app.locals.io;
      io.emit(`sent${contactId}`, { data, type, contactId, sender });
      res.send({
        status : 'success'
      });
    });
  });
});

module.exports = router;
