import mongoose from "mongoose";

const unitModelCar = new mongoose.Schema({
  marca: {
    type: String,
    required: true,
  },

  modelo: {
    type: Number,
    required: true,
  },

  lastOilChange: {
    type: Date,
    required: true,
  },

  nextOilChange: {
    type: Date,
    required: true,
  },
  kilometros:{
    type : Number,
    required:true
  }
});

const unitModel = mongoose.model("unitCars", unitModelCar);

export default unitModel;
