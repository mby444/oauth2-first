import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  provider: String,
  createdAt: String,
  updatedAt: String,
});

export default model("fb_users", userSchema);
