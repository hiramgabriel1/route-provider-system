import mongoose,{ Schema } from "mongoose";

const tiendamodel = new mongoose.Schema({
  nombre: {
    type: String,
    require: true,
  },

  coordinador:{
    type:String,
    require:true
  },

  coordenadas: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    }
  },
  direccion:{
    type:String,
    required:true
  },
  productos: [{
    type: Schema.Types.ObjectId,
    ref: "productos" // Ajusta este nombre según el nombre de tu modelo de producto
  }]
});

const tienda = mongoose.model("tienda", tiendamodel);

export default tienda;
