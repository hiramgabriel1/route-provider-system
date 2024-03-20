import mongoose, { Schema } from "mongoose";

const tiendamodel = new mongoose.Schema({
  nombre: {
    type: String,
    require: true,
  },

  coordinador: {
    type: String,
    require: true,
  },

  coordenadas: {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
  },
  direccion: {
    type: String,
    required: true,
  },
  productos: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "productos", 
      },
      price:{
        type:Number,
        required:true
      }
    },
  ],
});

const tienda = mongoose.model("tienda", tiendamodel);

export default tienda;
