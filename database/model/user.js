import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  createdAt: String,
  updatedAt: String,
});

export default model("users", userSchema);
