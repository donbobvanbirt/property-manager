const express = require('express');
const router = express.Router();

router.use('/clients', require('./clients'))
router.use('/properties', require('./properties'))

module.exports = router;
