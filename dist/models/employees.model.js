"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const employeesModel = new mongoose_1.default.Schema({
    user: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    lastnames: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
const employeeModel = mongoose_1.default.model("employees", employeesModel);
exports.default = employeeModel;
