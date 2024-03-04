import mongoose, { Schema } from "mongoose";

const requestProductsModel = new mongoose.Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: "productos"
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "productos",
      },
      amount:{
        type: Number
      }
    },
  ],
});

const requestProductsMarks = mongoose.model(
  "requestProducts",
  requestProductsModel
);
export default requestProductsMarks;
