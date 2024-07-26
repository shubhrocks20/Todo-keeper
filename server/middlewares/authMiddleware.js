import customErrorHandler from "../services/customErrorHandler.js";
import jwtService from "../services/jwtService.js";

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(
      customErrorHandler.notAuthorized("Not Authorized to make request!")
    );
  }
  const access_token = authorization.split(" ")[1];
  try {
    const { _id, email } = jwtService.verify(access_token);
    const user = {
      _id,
      email,
    };
    req.user = user;
    next();
  } catch (error) {
    return next(
      customErrorHandler.notAuthorized("Not Authorized to make request!")
    );
  }
};

export default authMiddleware;
