const jwt = require('jsonwebtoken');

require('dotenv').config();

function assignJwt(user) {
  // create and assing a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  return token;
}

function verifyJwt(req, res, next) {
  const token = req.header('authorization');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(401).send('Access Denied');
  }
}

module.exports.assignJwt = assignJwt;
module.exports.verifyJwt = verifyJwt;
