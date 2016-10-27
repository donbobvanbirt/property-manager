require('dotenv').config();

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.DB_URL;

const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose')

// MONGOOSE CONFIGURATION
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, err => {
  console.log(err || `MongoDB connected to ${MONGODB_URI}`)
});

const app = express();
const server = require('http').createServer(app);

server.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
});

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
