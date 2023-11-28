class CustomErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static alreadyExist(message) {
    return new CustomErrorHandler(409, message);
  }

  static wrongCredentials(message = "username and password are wrong") {
    return new CustomErrorHandler(401, message);
  }

  static notFound(message = "404 User Not Found") {
    return new CustomErrorHandler(404, message);
  }

  static unAuthorized(message = "unAuthorized") {
    return new CustomErrorHandler(401, message);
  }

  static serverError(message = "Internal Server Error") {
    return new CustomErrorHandler(505, message);
  }

  static somethingWentWrong(message = "Something Went Wrong") {
    return new CustomErrorHandler(400, message);
  }
}

module.exports = CustomErrorHandler;