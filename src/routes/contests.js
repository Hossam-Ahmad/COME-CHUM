var connection = require('./enviroment.js');
var express = require('express');
var router = express.Router();

/* GET contests listing. */
router.get('/all/:pageId', function(req, res, next) {
  connection.connect(function(err) {   
    var pageId = req.params['pageId'];
    connection.query(`SELECT * FROM contest where status = 1 LIMIT ${10*pageId}`, function(error,results,fields){
      res.send(results);
    });
  });
});

router.post('/remove', function(req, res, next) {
  connection.connect(function(err) {   
    var contestId = req.body['contestId'];
    connection.query('UPDATE contest SET status = 0 where id = ' + contestId, function(error,results,fields){
      res.send({
        status : 'success'
      });
    });
  });
});

router.get('/group/:profileId', function(req, res, next) {
  connection.connect(function(err) {   
    var profileId = req.params['profileId'];
    connection.query('SELECT * FROM groups where profile_id = ' + profileId, function(error,results,fields){
      res.send(results);
    });
  });
});

module.exports = router;
