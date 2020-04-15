var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
  host     : 'mysql://bad024e7c20c55:f1fb3c46@us-cdbr-iron-east-01.cleardb.net/heroku_f0cb29b5b6f62bb?reconnect=true',
  user     : 'bad024e7c20c55',
  password : 'f1fb3c46',
  database : 'heroku_f0cb29b5b6f62bb'
});

/* GET admins listing. */
router.post('/auth', function(req, res, next) {
  connection.connect(function(err) {
    var email = req.body['email'];
    var password = req.body['password'];
    connection.query(`SELECT * FROM admins where email like '${email}' and password like '${password}'`, function(error,results,fields){
        if(results.length > 0){
            res.send({
                status : 'success',
                token : '123456789'
            });
        } else {
            res.send({status : 'failed'});
        }
    });
  });
});


router.post('/forget', function(req, res, next) {
  connection.connect(function(err) {   
    var email = req.params['email'];
    var password = req.params['password'];
    connection.query("SELECT * FROM admins where email like 'admin@gmail.com' and password like '123'", function(error,results,fields){
      res.send({
        status : 'success',
        token : '123456789'
      });
    });
  });
});

router.post('/create', function(req, res, next) {
  connection.connect(function(err) {  
    var name = req.params['name']; 
    var email = req.params['email'];
    var password = req.params['password'];
    var read_perm = req.params['read_perm'];
    var write_perm = req.params['write_perm'];
    var print_perm = req.params['print_perm'];
    var financial_perm = req.params['financial_perm'];
    connection.query(`
    INSERT INTO admins('name', 'email', 'password', 'read_perm', 'write_perm', 'print_perm', 'financial_perm', 'active') VALUES 
    (${name},${email},${password},${read_perm},${write_perm},${print_perm},${financial_perm},'true')
    `, function(error,results,fields){
      res.send({
        status : 'success'
      });
    });
  });
});

router.post('/change', function(req, res, next) {
  connection.connect(function(err) {  
    var email = req.params['email'];
    var oldPassword = req.params['oldPassword'];
    var newPassword = req.params['newPassword'];
    connection.query(`SELECT * FROM admins where email like '${email}' and password like '${oldPassword}'`, function(error,results,fields){
      if(results.length > 0){
        connection.query(`
        UPDATE admins SET password=${newPassword} WHERE email=${email}
        `, function(error,results,fields){
          res.send({
            status : 'success'
          });
        });
      } else {
          res.send({status : 'failed'});
      }
    });
  });
});

router.post('/update', function(req, res, next) {
  connection.connect(function(err) {  
    var id = req.params['id'];  
    var name = req.params['name']; 
    var email = req.params['email'];
    var password = req.params['password'];
    var read_perm = req.params['read_perm'];
    var write_perm = req.params['write_perm'];
    var print_perm = req.params['print_perm'];
    var financial_perm = req.params['financial_perm'];
    var status = req.params['status'];
    connection.query(`
    UPDATE admins SET name=${name},email=${email},password=${password},read_perm=${read_perm},write_perm=${write_perm},print_perm=${print_perm},financial_perm=${financial_perm},active=${status} WHERE id=${id}
    `, function(error,results,fields){
      res.send({
        status : 'success'
      });
    });
  });
});

router.post('/delete', function(req, res, next) {
  connection.connect(function(err) {   
    var id = req.params['id'];
    connection.query("DELETE FROM admins where id = " + id, function(error,results,fields){
      res.send({
        status : 'success'
      });
    });
  });
});

module.exports = router;
