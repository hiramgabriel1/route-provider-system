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
      unitPrice:{
        type: Number,
        require: true
      },
      stateProduct: {
        type: String,  // vendido | no vendido | devolucion
        require: true
      },
      amount:{
        type: Number
      },
      amountCurrent:{
        type: Number
      },
      priceSold:{
        type:Number
      }
    },
  ],
  store:{
    type: Schema.Types.ObjectId,
    ref:  "tienda"
  },
  

});

const requestProductsMarks = mongoose.model(
  "requestProducts",
  requestProductsModel
);
export default requestProductsMarks;
