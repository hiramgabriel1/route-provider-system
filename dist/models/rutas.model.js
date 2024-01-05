"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const rutasSchema = new mongoose_1.default.Schema({
    empleado: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    },
    vehicle: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
const rutasModels = mongoose_1.default.model("rutas", rutasSchema);
exports.default = rutasModels;
