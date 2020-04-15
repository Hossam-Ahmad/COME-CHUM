var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'travel'
});

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


module.exports = router;
