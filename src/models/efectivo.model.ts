import mongoose, { Schema } from "mongoose";

const efectivo = new mongoose.Schema({
    efectivo: {
        type: String,
        required: false,
    },
});

const efectivoModel = mongoose.model("efectivo", efectivo);

export default efectivoModel;
