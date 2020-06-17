const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('test');
  res.send('hello world');
});

module.exports = router;
