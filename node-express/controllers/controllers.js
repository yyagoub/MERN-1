const express = require('express');
const router = express.Router();
const { verifyJwt } = require('../util/jwtUtil');

router.get('/', (req, res) => {
  if (req.session.viewCount) req.session.viewCount += 1;
  else req.session.viewCount = 1;
  console.log(req.session.viewCount);
  res.send(
    `<h1>You have visited this page ${req.session.viewCount} times.</h1>`
  );
});

router.use('/posts', verifyJwt, require('./posts'));

router.use('/auth', require('./auth'));

router.use('/test', require('./test'));

router.use('/user-management', require('./user-management'));

module.exports = router;
