const express = require('express');
const router = express.Router();

router.use('/register', require('./register'));

router.use('/auth', require('./auth'));

module.exports = router;
