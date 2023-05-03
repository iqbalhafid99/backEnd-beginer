const response = (statusCode, data, message, res) => {
  res.status(statusCode).json({
    payload: {
      statusCode,
      data,
      message,
    },
  });
};
module.exports = response;
