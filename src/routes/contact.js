var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'travel'
});

/* GET contact chats listing. */
router.get('/all/:pageId', function(req, res, next) {
  connection.connect(function(err) {   
    var pageId = req.params['pageId'];
    connection.query(`SELECT * FROM 
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
      res.send(results);
    });
  });
});

// router.get('/group/:profileId', function(req, res, next) {
//   connection.connect(function(err) {   
//     var profileId = req.params['profileId'];
//     connection.query('SELECT * FROM groups where profile_id = ' + profileId, function(error,results,fields){
//       res.send(results);
//     });
//   });
// });

module.exports = router;
