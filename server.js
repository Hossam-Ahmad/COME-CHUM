const express = require('express');
const http = require('http');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const groups = require('./src/routes/groups');
const admins = require('./src/routes/admins');
const users = require('./src/routes/users');

const app = express();
const port = process.env.PORT || 4200;


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/dist/travel-app'));


app.use('/api/admins', admins);
app.use('/api/groups', groups);
app.use('/api/users', users);
app.get('/*', (request, response) => {
    response.sendFile(__dirname + '/dist/travel-app/index.html');
});

const server = http.createServer(app);

server.listen(port, () => console.log('Running ...'));