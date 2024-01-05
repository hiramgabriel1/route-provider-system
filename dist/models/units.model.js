"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const unitModelCar = new mongoose_1.default.Schema({
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
});
const unitModel = mongoose_1.default.model("unitCars", unitModelCar);
exports.default = unitModel;
