import mongoose from "mongoose";
import "../config/dotenv.js";

export const connectDB = (callback = Function(), errCallback = Function()) => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    callback();
  } catch (err) {
    errCallback(err);
  }
};
