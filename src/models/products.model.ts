import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },

    descripcion: {
        type: String,
        required: true,
    },

    precio: {
        type: Number,
        required: true,
    },

});

const productsModel = mongoose.model("productos", productsSchema);

export default productsModel