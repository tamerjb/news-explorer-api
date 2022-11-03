const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const { JWT_SECRET } = require('../utils/config');
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  //used to commit this if to get the token , and then send it by postman header to get authroization

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('authorization Required '));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('authorization Required '));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
//first review
