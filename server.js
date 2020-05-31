const express = require('express');
const http = require('http');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const enviroment = require('./src/routes/enviroment.js');
const connection = enviroment.connection;

const groups = require('./src/routes/groups');
const admins = require('./src/routes/admins');
const users = require('./src/routes/users');
const events = require('./src/routes/events');
const statictics = require('./src/routes/statictics');
const contact = require('./src/routes/contact');
const finance = require('./src/routes/finance');
const contests = require('./src/routes/contests');
const blogs = require('./src/routes/blogs');
const packages = require('./src/routes/packages');
const payments = require('./src/routes/payments');
const social = require('./src/routes/social');
const faq = require('./src/routes/faq');
const settings = require('./src/routes/settings');
const chat = require('./src/routes/chat');
const feed = require('./src/routes/feed');
const content = require('./src/routes/content');
const interests = require('./src/routes/interests');

const app = express();
const port = process.env.PORT || 4200;


app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/dist/travel-app'));


app.use('/api/admins', admins);
app.use('/api/groups', groups);
app.use('/api/users', users);
app.use('/api/events', events);
app.use('/api/statictics', statictics);
app.use('/api/contact', contact);
app.use('/api/finance', finance);
app.use('/api/contests', contests);
app.use('/api/blogs', blogs);
app.use('/api/packages', packages);
app.use('/api/payments', payments);
app.use('/api/social', social);
app.use('/api/faq', faq);
app.use('/api/settings', settings);
app.use('/api/chat', chat);
app.use('/api/feed', feed);
app.use('/api/content', content);
app.use('/api/interests', interests);

app.get('/googlec2d96c9b2c4b2245.html', (request, response) => {
    response.send('google-site-verification: googlec2d96c9b2c4b2245.html');
});

app.get('/*', (request, response) => {
    response.sendFile(__dirname + '/dist/travel-app/index.html');
});

const server = http.createServer(app);

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('a user connected');
    let interval = null;
    const socketId = socket.id;
    socket.on('heartbeat', function(data) {
        console.log('received heart beat user !');
        clearInterval(interval);
        interval = setInterval(() => {
            console.log('user disconnected');

            connection.getConnection(function (err, conn) {
                var userId = data.user_id;
                console.log('update offline to database');
                connection.query('UPDATE users SET online = 0 , last_logout = CURRENT_TIMESTAMP()  where id = ' + userId, function(error,results,fields){
                  conn.release();
                });
            });
            // if(io.sockets.connected[socketId]) {
            //     io.sockets.sockets[socketId].disconnect();
            // }
            clearInterval(interval);
        }, 6000);
    });
});

app.locals.io = io

server.listen(port, () => console.log('Running ...'));