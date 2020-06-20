const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.session);
  if (req.session.viewCount) req.session.viewCount += 1;
  else req.session.viewCount = 1;
  console.log(req.session.viewCount);

  //res.send(`<h1>You have visited this page test times.</h1>`);
  res.send(`I'm Ahmed Yagoub`);
});

router.use('/posts', require('./posts'));

router.use('/users', require('./users'));

module.exports = router;
