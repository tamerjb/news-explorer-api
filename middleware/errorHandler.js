const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  // const message = statusCode === 500 ? 'An error has occurred on the server' : err.message;
  return res
    .status(statusCode)
    .send({
      message:
        statusCode === 500 ? 'An error has occurred on the server' : message,
    });
  // next();
};
module.exports = errorHandler;
// first review
