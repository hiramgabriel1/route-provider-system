import mongoose, { model } from "mongoose";

const login = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

export const loginModel = model("login-users", login)