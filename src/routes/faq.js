var enviroment = require('./enviroment.js');
var express = require('express');
var router = express.Router();
var connection = enviroment.connection;

/* GET groups listing. */
router.get('/all/:language/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var pageId = req.params['pageId'];
    var language = req.params['language'];
    conn.query(`
    SELECT * FROM faq WHERE status = 1 AND language = ${language}
    LIMIT ${10*pageId}
    `, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});


router.post('/create', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var data = req.body['data'];
    conn.query(`INSERT INTO faq(question, answer, language) VALUES
     ('${data.question}' , '${data.answer}' , ${data.language} )`, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
  });
});

router.post('/update', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var faqId = req.body['faqId'];
    var data = req.body['data'];
    conn.query(`UPDATE faq SET question = '${data.question}' , answer = '${data.answer}' where id = ${faqId}`, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
  });
});

router.post('/remove', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var faqId = req.body['faqId'];
    conn.query('UPDATE faq SET status = 0 where id = ' + faqId, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
  });
});

router.get('/faq/:faqId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var faqId = req.params['faqId'];
    conn.query('SELECT * FROM faq where id = ' + faqId, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});


router.post('/search', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var text = req.body['text'];
    var query = '';
    var words = text.split(' ');
    var index = 1;
    var count = 1;
    words.forEach(word => {
      query += `select * from (SELECT * FROM faq WHERE question LIKE '%${word}%') AS t${index}`;
      query += ` UNION `;
      query += `select * from (SELECT * FROM faq WHERE answer LIKE '%${word}%') AS t${index+1}`;
      if(words.length > count) {
        query += ` UNION `;
      }
      index += 2;
      count++;
    });
    query += ` GROUP BY id`;
    conn.query(query, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});


module.exports = router;
