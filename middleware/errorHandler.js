const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  const message =
    statusCode === 500 ? 'An error has occurred on the server' : err.message;
  res.status(statusCode);
  next();
};
module.exports = errorHandler;
