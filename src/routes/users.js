var enviroment = require('./enviroment.js');
var express = require('express');
var router = express.Router();
var connection = enviroment.connection;

/* GET users listing. */
router.get('/all/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    var pageId = req.params['pageId'];
    conn.query(`SELECT * FROM users where status = 1 LIMIT ${10*pageId}`, function(error,results,fields){
      conn.release();  
      res.send(results);
    });
  });
});

router.get('/user/:userId', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    var userId = req.params['userId'];
    connection.query(`SELECT * FROM users where id = ${userId}`, function(error,results,fields){
      conn.release();  
      res.send(results);
    });
  });
});

router.post('/remove', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    var userId = req.body['userId'];
    connection.query('UPDATE users SET status = 0 where id = ' + userId, function(error,results,fields){
      conn.release();  
      res.send({
        status : 'success'
      });
    });
  });
});

router.post('/forget', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    var email = req.body['email'];

    connection.query(`SELECT count(id) 'count' FROM users WHERE email = '${email}' `, function(error,results,fields){
      conn.release();
      if(results[0]['count'] > 0){
        const nodemailer = require("nodemailer");

        let transporter = nodemailer.createTransport({
          host: enviroment.mail.host,
          port: enviroment.mail.port,
          secure: false, // true for 465, false for other ports
          auth: {
            user: enviroment.mail.user, // generated ethereal user
            pass: enviroment.mail.pass // generated ethereal password
          }
        });
        transporter.sendMail({
          from: `"Come Chum" <${enviroment.mail.email}>`, // sender address
          to: `${email}`, 
          subject: "Come Chum | Forget Password", 
          html: `

          <div style="background:#fff;color:#24292e;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:14px!important;height:100%!important;line-height:1.5;margin:0;padding:0;width:100%!important" bgcolor="#fff">

        <table style="background:#fff;width:100%" width="100%" bgcolor="#fff">
          <tbody><tr>
            <td style="vertical-align:top" valign="top"></td>
            <td style="display:block;margin:0 auto;max-width:580px;padding:24px;vertical-align:top;width:580px" width="580" valign="top">
              <div style="display:block;margin:0 auto;max-width:580px">
        
        <span style="color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;width:0">Password Reset</span>
        
        <div style="border-bottom-color:#eee;border-bottom-style:solid;border-bottom-width:1px;margin-bottom:16px;padding-bottom:8px;padding-top:8px;width:100%">
          <table style="width:100%" width="100%">
            <tbody><tr>
              <td style="vertical-align:top" valign="top">
                <a style="color:#0366d6;text-decoration:none" target="_blank">
                  <img src="${enviroment.domain}/assets/images/logo_website.png" alt="Come Chum" style="max-width:100%" class="CToWUd" width="100" height="70">
                </a>
              </td>
            </tr>
          </tbody></table>
        </div>
        
        <div style="margin-bottom:8px!important">
          <div style="font-size:24px!important;font-weight:600!important;line-height:1.25!important">
          Password Reset
          </div>
        </div>
        
        <div style="padding-bottom:8px!important">
          <div style="margin-bottom:16px!important">
            <p>We received a request password reset from you.</p>
            <p>
              please click on this link to reset your password
              <span style="font-weight:600!important">
                  <a href="${enviroment.domain}/reset/?id=6546" style="text-decoration:underline" target="_blank">${enviroment.domain}/reset</a>
              </span>
            </p>
          </div>
        
        </div>
        
        
                <div style="clear:both;width:100%">
                  <hr style="border-top-color:#e1e4e8;border-top-style:solid;border-width:1px 0 0;color:#959da5;font-size:12px;height:0;line-height:18px;margin-bottom:30px;margin-top:24px;overflow:visible">
                  <div style="color:#959da5;font-size:12px;line-height:18px">
                    <p style="color:#959da5;font-size:12px;font-weight:normal;line-height:18px;margin:0 0 15px">
                    <a style="color:#959da5;font-size:12px;line-height:18px;text-decoration:none" target="_blank">Come Chum , copyrights 2020</a> ·
                    </p>
                  </div>
                </div>
              </div>
        
            </td>
            <td style="vertical-align:top" valign="top"></td>
          </tr>
        </tbody></table><div class="yj6qo"></div><div class="adL">
        
        </div></div>
          
          `
        });
        res.send({
          'status' : 'success'
        });
      } else {
        res.send({
          'status' : 'not found'
        });
      }
    });
  });
});

router.get('/user/:profileId', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var profileId = req.params['profileId'];
    conn.query('SELECT * FROM users where profile_id = ' + profileId, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});

module.exports = router;
