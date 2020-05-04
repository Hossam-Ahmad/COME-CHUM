const express = require('express');
const http = require('http');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var cors = require('cors')

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

app.get('/*', (request, response) => {
    response.sendFile(__dirname + '/dist/travel-app/index.html');
});

const server = http.createServer(app);

server.listen(port, () => console.log('Running ...'));