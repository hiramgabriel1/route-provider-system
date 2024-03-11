import mongoose, { Schema } from "mongoose";

const requestProductsModel = new mongoose.Schema({
  route: {
    type: Schema.Types.ObjectId,
    ref: "rutas"
  },
  state:{
    type: String
    // pendiente | revisado | aprobado | rechazado
  },
  dateTime:{
    type: String
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "productos",
      },
      amount:{
        type: Number
      },
      amountCurrent:{
        type: Number
      },
    },
  ],
});

const requestProductsMarks = mongoose.model(
  "requestProducts",
  requestProductsModel
);
export default requestProductsMarks;
