import createHttpError from "http-errors";
import Joi from "joi";
import { User } from "../models/user.model.js";
import customErrorHandler from "../services/customErrorHandler.js";
import bcrypt from "bcrypt";
import jwtService from "../services/jwtService.js";

const userController = {
  async register(req, res, next) {
    // console.log("Hello");
    const registerSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(16).required(),
    });
    const { error } = registerSchema.validate(req.body);
    // if any error send the flow to errorHandler
    if (error) {
      return next(error);
    }
    // already registered or not
    try {
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        return next(
          customErrorHandler.alreadyExist("User already exist with this email")
        );
      }
    } catch (error) {
      return next(error);
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // store user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    return res.status(201).json({ message: "User creater" });
  },
  async login(req, res, next) {
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(16).required(),
    });
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    let user;
    // already registered or not
    try {
      user = await User.findOne({ email: req.body.email });

      if (!user) {
        return next(
          customErrorHandler.wrongCredentials("Invalid email address")
        );
      }
      // Check for password
      const isPasswordSame = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordSame) {
        return next(customErrorHandler.wrongCredentials("wrong password"));
      }
      // generate tokens
      const access_token = jwtService.sign({
        _id: user._id,
        email: user.email,
      });

      res.json(access_token);
    } catch (error) {
      return next(error);
    }
  },
  async me(req, res, next) {
    const { email } = req.user;

    try {
      const user = await User.findOne({ email }).select("-__v -password");
      if (!user) {
        return next(customErrorHandler.notFound("No user found!"));
      }
      return res.json(user);
    } catch (error) {
      return next(error);
    }
  },
};
export default userController;
