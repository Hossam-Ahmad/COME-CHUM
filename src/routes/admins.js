var enviroment = require('./enviroment.js');
var express = require('express');
var router = express.Router();
var connection = enviroment.connection;

/* GET admins listing. */
router.post('/auth', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    if(err) {
      console.log(err);
    } else {
      var email = req.body['email'];
      var password = req.body['password'];
      conn.query(`SELECT * FROM admins where email like '${email}' and password like '${password}'`, function(error,results,fields){
        conn.release();  
        if(results.length > 0){
              res.send({
                  status : 'success',
                  token : '123456789'
              });
          } else {
              res.send({status : 'failed'});
          }
      });
    }
  });
});


router.post('/forget', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    var email = req.params['email'];
    var password = req.params['password'];
    conn.query("SELECT * FROM admins where email like 'admin@gmail.com' and password like '123'", function(error,results,fields){
      conn.release();
      res.send({
        status : 'success',
        token : '123456789'
      });
    });
  });
});

router.post('/create', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    var name = req.params['name']; 
    var email = req.params['email'];
    var password = req.params['password'];
    var read_perm = req.params['read_perm'];
    var write_perm = req.params['write_perm'];
    var print_perm = req.params['print_perm'];
    var financial_perm = req.params['financial_perm'];
    conn.query(`
    INSERT INTO admins('name', 'email', 'password', 'read_perm', 'write_perm', 'print_perm', 'financial_perm', 'active') VALUES 
    (${name},${email},${password},${read_perm},${write_perm},${print_perm},${financial_perm},'true')
    `, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
  });
});

router.post('/change', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    var email = req.params['email'];
    var oldPassword = req.params['oldPassword'];
    var newPassword = req.params['newPassword'];
    connection.query(`SELECT * FROM admins where email like '${email}' and password like '${oldPassword}'`, function(error,results,fields){
      if(results.length > 0){
        conn.query(`
        UPDATE admins SET password=${newPassword} WHERE email=${email}
        `, function(error,results,fields){
          conn.release();
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
  connection.getConnection(function (err, conn) {
    var id = req.params['id'];  
    var name = req.params['name']; 
    var email = req.params['email'];
    var password = req.params['password'];
    var read_perm = req.params['read_perm'];
    var write_perm = req.params['write_perm'];
    var print_perm = req.params['print_perm'];
    var financial_perm = req.params['financial_perm'];
    var status = req.params['status'];
    conn.query(`
    UPDATE admins SET name=${name},email=${email},password=${password},read_perm=${read_perm},write_perm=${write_perm},print_perm=${print_perm},financial_perm=${financial_perm},active=${status} WHERE id=${id}
    `, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
  });
});

router.post('/delete', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    var id = req.params['id'];
    conn.query("DELETE FROM admins where id = " + id, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
  });
});

module.exports = router;
