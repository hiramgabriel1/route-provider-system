import mongoose from "mongoose";

const productsMark = new mongoose.Schema({
  productIdScan: {
    type: Number,
    require: true
  },

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

  utils: {
    type: Number
  }
});

const productMarks = mongoose.model("productos", productsMark);

export default productMarks;
