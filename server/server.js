require('dotenv').config();

const PORT = process.env.PORT || 8000;

const app = require('./app');

const server = require('http').createServer(app);

server.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
});
