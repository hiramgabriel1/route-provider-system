"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employees_model_1 = __importDefault(require("../models/employees.model"));
class homeController {
    async getDataParams(req, res) {
        try {
            const getUsersAll = await employees_model_1.default.find();
            const convertObjectToArray = Object.values(getUsersAll);
            const filterUserToTypeRole = convertObjectToArray.filter((userTypeRole) => {
                return (userTypeRole.role === "Administrador" ||
                    userTypeRole.role === "Empleado" ||
                    userTypeRole.role === "administrador" ||
                    userTypeRole.role === "empleado");
            });
            console.log(getUsersAll);
            res.json({ response: filterUserToTypeRole });
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = homeController;
