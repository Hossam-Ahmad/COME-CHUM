var connection = require('./enviroment.js');

var express = require('express');
var router = express.Router();

/* GET groups listing. */
router.get('/all/:pageId', function(req, res, next) {
  connection.connect(function(err) {   
    var pageId = req.params['pageId'];
    connection.query(`select p.name "package_name" , f.method , f.created_at , u.name "user_name"
    from finance f , packages p , users u
    where f.package_id = p.id and u.id = f.user_id
    ORDER BY f.created_at DESC
    limit ${10*pageId}`, function(error,results,fields){
      res.send(results);
    });
  });
});

router.get('/statictics/:day?/:month?/:year?', function(req, res, next) {
  connection.connect(function(err) {   
    var day = req.params['day'];
    var month = req.params['month'];
    var year = req.params['year'];

    if(day) {
      
      connection.query(`select t1.*, t2.* , t3.*, t4.* from 
      (select sum(amount) as 'day' from finance where DATE(created_at) BETWEEN '${year}-${month}-${day}' AND DATE_ADD('${year}-${month}-${day}',INTERVAL 1 DAY) ) as t1,
      (select sum(amount) as 'month' from finance where DATE(created_at) BETWEEN '${year}-${month}-1' AND DATE_ADD('${year}-${month}-1',INTERVAL 1 MONTH) ) as t2,
      (select sum(amount) as 'year' from finance where DATE(created_at) BETWEEN '${year}-1-1' AND DATE_ADD('${year}-1-1',INTERVAL 1 YEAR) ) as t3,
      (select sum(amount) as 'total' from finance) as t4`, function(error,results,fields){
        res.send(results);
      });

    } else {
      connection.query(`select t1.*, t2.* , t3.*, t4.* from 
      (select sum(amount) as 'day' from finance where DATE(created_at) >= CURDATE() - INTERVAL 1 DAY ) as t1,
      (select sum(amount) as 'month' from finance where MONTH(created_at) =  MONTH(CURDATE()) ) as t2,
      (select sum(amount) as 'year' from finance where YEAR(created_at) = YEAR(CURDATE()) ) as t3,
      (select sum(amount) as 'total' from finance) as t4`, function(error,results,fields){
        res.send(results);
      });
    }

    
  });
});


module.exports = router;
