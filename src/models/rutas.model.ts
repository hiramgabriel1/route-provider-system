import mongoose, { Schema }  from "mongoose";

const rutasSchema = new mongoose.Schema({
  empleado: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  tiendas: [ 
    {
        type: Schema.Types.ObjectId,
        ref: "tienda",
      }
    ],

  status: {
    type: Boolean,
    required: true,
  },

  amountOfMerchandise: {
    type: Number,
    required: true,
  },

  LastMinuteSale: {
    type: String,
    required: true,
  },
  productsAccepted:[
        {
        type: Schema.Types.ObjectId,
          ref: "productos",
        }
    ]
});

const rutasModels = mongoose.model("rutas", rutasSchema);

export default rutasModels;
