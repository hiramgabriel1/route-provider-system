import mongoose,{ Schema } from "mongoose";

const tiendamodel = new mongoose.Schema({
  nombre: {
    type: String,
    require: true,
  },

  direccion: {
    type: String,
    require: true,
  },
  productos:[
    {
        product: {
          type: Schema.Types.ObjectId,
          ref: "productos",
        }
    }
  ]
});

const tienda = mongoose.model("tienda", tiendamodel);

export default tienda;
