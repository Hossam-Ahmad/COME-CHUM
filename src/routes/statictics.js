var enviroment = require('./enviroment.js');
var express = require('express');
var router = express.Router();
var connection = enviroment.connection;

/* GET statictics listing. */
router.get('/all/:package_id', function(req, res, next) {
  var package_id = req.params['package_id'];
  connection.getConnection(function (err, conn) {   
    conn.query(`select t1.*, t2.* , t3.*, t4.*, t5.*, t6.* from 
      (select count(id) as 'users' from users where status = 1 ) as t1,
      (select count(id) as 'groups' from groups where status = 1 ) as t2,
      (select count(id) as 'events' from events where status = 1 ) as t3,
      (select sum(amount) as 'total' from finance) as t4,
      (select count(id) as 'visitors' from unsigned_users ) as t5,
      (select count(id) as 'users_package' from users where package = ${package_id} ) as t6`, function(error,results,fields){
        conn.release();
        res.send(results);
    });
    
  });
});

module.exports = router;
