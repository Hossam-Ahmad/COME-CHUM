var enviroment = require('./enviroment.js');
var express = require('express');
var router = express.Router();
var connection = enviroment.connection;

router.post('/auth', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    if(err) {
      console.log(err);
    } else {
      var email = req.body['email'];
      var password = req.body['password'];
      conn.query(`SELECT * FROM users where email like '${email}' and password like '${password}'`, function(error,results,fields){
        conn.query(`SELECT count(*) FROM users where email like '${email}' and password like '${password}' and ( (package = 0 and DATEDIFF(CURDATE(), created_at) <= 7) or (package != 0 and package_end >= CURDATE()) )`, function(error,results2,fields){
          if(results2[0]['count(*)'] > 0) {
            conn.query(`UPDATE users SET online = 1 where email like '${email}' and password like '${password}'`, function(error,results3,fields){
              conn.release();  
              if(results.length > 0){
                if(results[0]['status'] == 1){
                  res.send({
                    status : 'success',
                    token : results[0]['token'],
                    name : results[0]['name'],
                    id : results[0]['id'],
                    image : results[0]['image'],
                    email : results[0]['email'],
                    cover : results[0]['cover'],
                    about : results[0]['about'],
                    profile_id : results[0]['profile_id'],
                    package : results[0]['package'],
                  });
                } else {
                  res.send({
                    status : 'not_activated',
                  });
                }
              } else {
                res.send({
                  status : 'failed',
                });
              }
            });
          } else {
            res.send({status : 'package_expired'});
          }
        });
      });
    }
  });
});

router.get('/all/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    var pageId = req.params['pageId'];
    conn.query(`SELECT * FROM users where status = 1 LIMIT ${10*pageId}`, function(error,results,fields){
      conn.release();  
      res.send(results);
    });
  });
});

router.get('/online/:pageId', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    var pageId = req.params['pageId'];
    conn.query(`SELECT * FROM users where status = 1 AND online = 1 LIMIT ${10*pageId}`, function(error,results,fields){
      conn.release();  
      res.send(results);
    });
  });
});

router.get('/user/:userId', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    var userId = req.params['userId'];

    connection.query(`SELECT * , u.name user_name , p.name package_name , c.name_ar country_name , cc.name_ar city_name
    FROM users u , packages p , countries c , cities cc
    where u.id = ${userId} AND u.package = p.id AND u.country = c.id AND u.city = cc.id`, function(error,results,fields){
      connection.query(`SELECT i.name_ar
      FROM users u , interests i , interests_users iu 
      where u.id = ${userId} AND u.id = iu.user_id AND iu.interest_id = i.id`, function(error,results2,fields){
        conn.release();  
        results[0].interests = results2;
        res.send(results);
      });
    });
  });
});

router.get('/user/profileId/:profileId', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    var profileId = req.params['profileId'];
    connection.query(`SELECT * FROM users where profile_id = '${profileId}'`, function(error,results,fields){
      conn.release();  
      res.send(results);
    });
  });
});

router.get('/user/token/:token', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    var token = req.params['token'];
    connection.query(`SELECT * FROM users where token = '${token}' and status = 1`, function(error,results,fields){
      connection.query(`UPDATE users SET online = 1 where token = '${token}'`, function(error,results2,fields){
        conn.release();  
        res.send(results[0]);
      });
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
                  <img src="${enviroment.domain}/assets/images/logo_website.webp" alt="Come Chum" style="max-width:100%" class="CToWUd" width="100" height="70">
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

router.post('/update', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    var token = req.body['token'];
    var data = req.body['data'];
    connection.query(`UPDATE users SET name = '${data.name}' , email = '${data.email}' , phone = '${data.phone}' , gender = ${data.gender} , country = ${data.country} , postal_code = '${data.postal_code}' where token = '${token}'`, function(error,results,fields){
      conn.release();  
      res.send({
        status : 'success'
      });
    });
  });
});

router.post('/logout', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    var userId = req.body['userId'];
    connection.query('UPDATE users SET online = 0 , last_logout = CURRENT_TIMESTAMP() where id = ' + userId, function(error,results,fields){
      conn.release();  
      res.send({
        status : 'success'
      });
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

router.get('/unauthenticated/:token', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var token = req.params['token'];
    conn.query(`SELECT c.id contact_id , u.id , u.token , u.last_time
    FROM unsigned_users u , contact c  
    where (token = '${token}') AND (u.id = c.user_id) AND (c.type = 0)`, function(error,results,fields){
      if(results.length > 0){
        conn.query(`UPDATE unsigned_users SET last_time = CURRENT_TIMESTAMP()`, function(error,results2,fields){
          conn.release();
          res.send(results);
        });
      }else{
        conn.release();
        res.send(results);
      }
    });
  });
});

router.post('/unauthenticated', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    var token = req.body['token'];
    connection.query(`INSERT INTO unsigned_users (token) VALUES ( '${token}')`, function(error,results,fields){
      connection.query(`INSERT INTO contact (user_id, type) VALUES ('${results.insertId}', 0)`, function(error,results2,fields){
        connection.query(`SELECT c.id contact_id , u.id , u.token , u.last_time
        FROM unsigned_users u , contact c  
        where (token = '${token}') AND (u.id = c.user_id) AND (c.type = 0)`, function(error,results3,fields){
          conn.release();  
          res.send(results3);
        });
      });
    });
  });
});

router.post('/create', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    var data = req.body['data'];
    console.log(data);
    var profile_id = Math.random().toString(36).substr(2, 9);
    var token = Math.random().toString(36).substr(2, 9);
    console.log(data.interests);
    connection.query(`INSERT INTO users (name,email,password,country,city,phone,postal_code,gender,profile_id,package,status,image,cover,about,online,token,fb_id,fb_token,google_id,google_token,twitter_id,twitter_token) VALUES ( '${data.name}','${data.email}','${data.password}',${data.country},${data.city},'${data.prefix + data.phone}','${data.postal_code}',${data.gender},'${profile_id}',0,0,'${data.profile_picture}','${data.cover}','${data.about}',0,'${token}','${data.fb_id ? data.fb_id : null}','${data.fb_token ? data.fb_token : null}','${data.google_id ? data.google_id : null}','${data.google_token ? data.google_token : null}','${data.twitter_id ? data.twitter_id : null}','${data.twitter_token ? data.twitter_token : null}')`, function(error,results,fields){
      data.interests.forEach(interest => {
        connection.query(`INSERT INTO interests_users (user_id, interest_id) VALUES (${results.insertId}, ${interest})`, function(error,results2,fields){

        });
      });
      conn.release();
      res.send({
        status : 'success',
        token : token,
        name : data.name,
        id : results.insertId,
        image : data.image,
        email : data.email,
        cover : data.cover,
        about : data.about,
        profile_id : profile_id,
        country : data.country,
        city : data.city,
        gender : data.gender
      });
    });
  });
});

router.get('/cards/:user_id', function(req, res, next) {
  connection.getConnection(function (err, conn) { 
    var user_id = req.params['user_id'];
    conn.query(`SELECT * FROM cards where user_id = '${user_id}'`, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});

router.post('/cards/create_card', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    var data = req.body['data'];
    console.log(data);
    connection.query(`UPDATE cards SET default_card = 0;
    INSERT INTO cards (user_id,type,default_card,card_number,exp,vcc) VALUES (${data.user_id},${data.type},${data.default_card},'${data.card_number}','${data.exp}','${data.vcc}')`, function(error,results,fields){
          conn.release();
           res.send({
            status : 'success'
      });
    });
  });
});

router.post('/cards/default_card', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    var id = req.body['id'];
    connection.query(`UPDATE cards SET default_card = 0;
    UPDATE cards SET default_card = 1 where id = ${id}`, function(error,results,fields){
      conn.release();
      res.send({
        status : 'success'
      });
    });
  });
});

router.post('/search', function(req, res, next) {
  connection.getConnection(function (err, conn) {
    var data = req.body['data'];
    console.log(data);
    var name_search = data['name_search'];
    var email_search = data['email_search'];
    var package_search = data['package_search'];
    var whereConditions = 'where ';
    if(name_search != '') {
      whereConditions += `name like '%${name_search}%'`;
    }
    if(email_search != '') {
      if(whereConditions != 'where ') {
        whereConditions += ' and ';
      }
      whereConditions += `email = '${email_search}'`;
    }
    if(package_search != -1) {
      if(whereConditions != 'where ') {
        whereConditions += ' and ';
      }
      whereConditions += `package = ${package_search}`;
    }
    if(whereConditions == 'where ') {
      whereConditions = '';
    }
    console.log(`select * from users ${whereConditions}`);
    connection.query(`select * from users ${whereConditions}`, function(error,results,fields){
      conn.release();
      res.send(results);
    });
  });
});

module.exports = router;
