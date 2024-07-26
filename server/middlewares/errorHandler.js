import Joi from "joi";
import customErrorHandler from "../services/customErrorHandler.js";
const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof Joi.ValidationError) {
    statusCode = 422;
    message = err.message;
  }
  if (err instanceof customErrorHandler) {
    statusCode = err.status;
    message = err.message;
  }

  return res.status(statusCode).json(message);
};
export default errorHandler;
