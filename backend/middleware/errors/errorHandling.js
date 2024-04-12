const errorHandler = (error, req, res, next) => {

  console.error(error);

  // In case of database error, send generic code and message
  if (error.code.toString().length >= 5) {
    res.status(500).send({ error: 'Something went wrong' });
  }
  else {
    // Otherwise send the error code and message
    res.status(error.code).send({ error: error.message });
  }
};

module.exports = { errorHandler }
