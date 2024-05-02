import mongoose from "mongoose";

const creditStore = new mongoose.Schema({
    // storeId: {
    //     type: Number
    // },   

    storeName: {
        type: String,
        required: true,
    },

    credit: { type: Number, required: false },
});

const creditStoreModel = mongoose.model("creditsStore", creditStore);

export default creditStoreModel;
