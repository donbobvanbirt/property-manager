

const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

const config = require('./config/config');

const NODE_ENV = process.env.NODE_ENV || 'development';
const MONGODB_URI = config.db[NODE_ENV];

// MONGOOSE CONFIGURATION
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, err => {
  console.log(err || `MongoDB connected to ${MONGODB_URI}`)
});

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

require('./config/webpack')(app);

app.use('/api', require('./routes/api'));

// app.get('/', (req, res) => {
//   let filepath = path.resolve('index.html');
//   res.sendFile(filepath);
// });

app.use("*", function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;
