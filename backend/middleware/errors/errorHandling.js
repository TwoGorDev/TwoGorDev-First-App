const errorHandler = (error, req, res, next) => {

  console.error(error);

  // In case of database error, send generic code and message
  if (error.code.toString().length >= 5) {
    res.status(500).json({ error: 'Something went wrong' });
  }
  // Otherwise send the error code and message
  res.status(error.code).json({ error: error.message });
};

module.exports = { errorHandler }
