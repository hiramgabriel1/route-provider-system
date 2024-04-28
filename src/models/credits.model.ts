import mongoose from "mongoose";

const creditStore = new mongoose.Schema({
    storeName: {
        type: String,
        required: true,
    },

    credit: { type: Number, required: true },
});

const creditStoreModel = mongoose.model("creditsStore", creditStore);

export default creditStoreModel;
