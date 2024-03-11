"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productsMark = new mongoose_1.default.Schema({
    productIdScan: {
        type: Number,
        require: true
    },
    productName: {
        type: String,
        require: true,
    },
    productDescription: {
        type: String,
        require: true,
    },
    productPrice: {
        type: Number,
        require: true,
    },
    productIsSold: {
        type: Boolean,
        require: true,
    },
});
const productMarks = mongoose_1.default.model("productos", productsMark);
exports.default = productMarks;
