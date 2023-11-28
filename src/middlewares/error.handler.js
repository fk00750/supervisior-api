const CustomErrorHandler = require("../utils/custom.error.handler");

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;

  // default error msg
  let data = {
    message: "Internal Server Error",
    errorMessage: err.message,
  };

  // custom error messages
  if (err instanceof CustomErrorHandler) {
    console.log(
      "Instance of CustomErrorHandler.js message from ErrorHandler.js file", err.message
    );
    statusCode = err.status;
    data = {
      message: err.message,
    };
  }

  return res.status(statusCode).json(data);
};

module.exports = errorHandler;