import mongoose from "mongoose";

const productsMark = new mongoose.Schema({
  productName: {
    type: String,
    require: true,
  },

  productDescription: {
    type: String,
    require: true,
  },

  productPrice: {
    type: Number,
    require: true,
  },

  productIsSold: {
    type: Boolean,
    require: true,
  },

  salesProducts: {
    type: Number,
  },
});

export const productMarks = mongoose.model("productos-marcados", productsMark);
