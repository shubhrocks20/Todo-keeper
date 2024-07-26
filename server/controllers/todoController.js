import Joi from "joi";
import { User } from "../models/user.model.js";
import customErrorHandler from "../services/customErrorHandler.js";
import { Todo } from "../models/todo.model.js";
import mongoose from "mongoose";

const todoController = {
  async create(req, res, next) {
    const { _id } = req.user;
    if (!_id) {
      return next(customErrorHandler.notFound("No id found!"));
    }
    const todoSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
    });
    const { error } = todoSchema.validate(req.body);

    // if any user exist with this objectId
    try {
      const user = await User.findById(_id);

      if (!user) {
        return next(customErrorHandler.notFound("User not found!"));
      }

      const newTodo = new Todo({
        title: req.body.title,
        description: req.body.description,
        author: _id,
      });
      const savedTodo = await newTodo.save();
      console.log(user);

      res.status(201).json({ message: "Todo Created Successfully!!" });
    } catch (error) {
      return next(error);
    }
  },
  async readTodo(req, res, next) {
    const { _id } = req.user;
    if (!_id) {
      return next(customErrorHandler.notFound("No id found!"));
    }
    // if user exist
    try {
      const user = await User.findById(_id);
      if (!user) {
        return next(customErrorHandler.notFound("No User Found with this id"));
      }
      // Now fetch all the todos
      const todos = await Todo.find({ author: _id }).populate("author", "name");
      if (!todos) {
        return next(customErrorHandler.notFound("No Todo found for this user"));
      }

      res.json(todos);
    } catch (error) {
      return next(error);
    }
  },
  async deleteTodo(req, res, next) {
    const { id } = req.params;
    console.log("hello");
    const { _id } = req.user;
    if (!_id) {
      return next(customErrorHandler.notFound("No id found!"));
    }
    try {
      const user = await User.findById(_id);
      if (!user) {
        return next(customErrorHandler.notFound("No User Found with this id"));
      }
      // Now fetch all the todos
      const todo = await Todo.findOneAndDelete({ _id: id });

      if (!todo) {
        return next(customErrorHandler.notFound("No Todo found for this user"));
      }

      res.status(204).json({ message: "Successfully Deleted Todo" });
    } catch (error) {
      return next(error);
    }
  },
};

export default todoController;
