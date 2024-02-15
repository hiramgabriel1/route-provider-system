import mongoose from "mongoose";

const productsMark = new mongoose.Schema({
  productIdScan: {
    type: String
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
    // require: true,
  },
});

const productMarks = mongoose.model("productos", productsMark);

export default productMarks;
