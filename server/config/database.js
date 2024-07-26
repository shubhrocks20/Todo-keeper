import mongoose from "mongoose";
import { MONGO_URI } from "./index.js";

const connectDB = async () => {
  await mongoose
    .connect(MONGO_URI)
    .then((connection) => {
      console.log(`Database connected successfully`);
    })
    .catch((error) => {
      console.log(`Error while connecting to DB`);
      return next(error);
    });
};

export default connectDB;
