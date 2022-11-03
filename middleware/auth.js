const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const { JWT_SECRET } = require('../utils/config');
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  // console.log('authorization', authorization);
  // console.log('JWT_SECRET', JWT_SECRET);

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
  // console.log(req.user);
  return next();
};

module.exports = auth;
