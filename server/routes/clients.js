const express = require('express');
const router = express.Router();

const Client = require('../models/Client');

router.route('/')
  .get((req, res) => {
    Client.find()
      .then(clients => res.send(clients))
      .catch(err => res.status(400).send(err))
  })

  .post((req, res) => {
    Client.create(req.body)
    .then(client => res.send(client))
    .catch(err => res.status(400).send(err))
  })

module.exports = router;
