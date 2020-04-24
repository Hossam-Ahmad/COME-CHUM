var connection = require('./enviroment.js');

var express = require('express');
var router = express.Router();

/* GET statictics listing. */
router.get('/all', function(req, res, next) {
  connection.connect(function(err) {   
    
    connection.query(`select t1.*, t2.* , t3.*, t4.* from 
      (select count(id) as 'users' from users where status = 1 ) as t1,
      (select count(id) as 'groups' from groups where status = 1 ) as t2,
      (select count(id) as 'events' from events where status = 1 ) as t3,
      (select sum(amount) as 'total' from finance) as t4`, function(error,results,fields){
        res.send(results);
    });
    
  });
});

module.exports = router;
