class customErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static alreadyExist(message) {
    return new customErrorHandler(409, message);
  }
  static notFound(message) {
    return new customErrorHandler(404, message);
  }
  static wrongCredentials(message) {
    return new customErrorHandler(404, message);
  }
  static notAuthorized(message) {
    return new customErrorHandler(404, message);
  }
}

export default customErrorHandler;
