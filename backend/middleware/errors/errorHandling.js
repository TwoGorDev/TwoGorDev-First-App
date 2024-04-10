const errorHandler = (error, req, res, next) => {

  console.error(error);

  // In case of database error, send generic code and message
  if (error.code.toString().length >= 5) {
    res.status(500).send('Something went wrong')
  }
  // Otherwise send the error code and message
  res.status(error.code).send(error.message)
};

module.exports = { errorHandler }
