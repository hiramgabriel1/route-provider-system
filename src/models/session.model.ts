import mongoose from "mongoose";

const sessionModel = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },

  role: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },
});

const session = mongoose.model("session", sessionModel);

export default session;
