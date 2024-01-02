import mongoose from "mongoose";

const rutasSchema = new mongoose.Schema({
  empleado: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  start: {
    type: [Number], 
    required: true,
  },

  end: {
    type: [Number], 
    required: true,
  },

  status: {
    type: Boolean,
    required: true,
  },

  amountOfMerchandise: {
    type: Boolean,
    required: true,
  },

  LastMinuteSale: {
    type: Boolean,
    required: true,
  },
});

const rutasModels = mongoose.model("rutas", rutasSchema);

export default rutasModels;
