"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employees_model_1 = __importDefault(require("../models/employees.model"));
const products_1 = require("../services/employees/models/products");
const rutas_model_1 = __importDefault(require("../models/rutas.model"));
class homeController {
    async getDataParams(__req, res) {
        try {
            const getUsersAll = await employees_model_1.default.find();
            const totalRoutes = await rutas_model_1.default.find();
            const productsTotal = await products_1.productMarks.find();
            const convertObjectToArray = Object.values(getUsersAll);
            const filterUserToTypeRole = convertObjectToArray.filter((userTypeRole) => {
                return (userTypeRole.role === "Administrador" ||
                    userTypeRole.role === "Empleado" ||
                    userTypeRole.role === "administrador" ||
                    userTypeRole.role === "empleado");
            });
            res.status(200).json({
                filterTypeUser: filterUserToTypeRole,
                numberEmployees: convertObjectToArray.length,
                productsTotal: productsTotal,
                totalRoutes: totalRoutes.length,
            });
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = homeController;
