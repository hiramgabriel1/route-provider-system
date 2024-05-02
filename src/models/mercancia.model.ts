import mongoose, { Schema } from "mongoose";

const mercancia = new mongoose.Schema({
  mercancia: {
    type: String,
    required: false,
  },

});

const mercanciaModel = mongoose.model("mercancia", mercancia);

export default mercanciaModel;
