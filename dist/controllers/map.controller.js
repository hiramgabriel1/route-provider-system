"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rutas_model_1 = __importDefault(require("../models/rutas.model"));
class mapController {
    async showMap(req, res) {
        try {
            const { routeID } = req.params;
            const ruta = await rutas_model_1.default.findById(routeID);
            ruta
                ? res.status(200).json({ start: ruta.start, end: ruta.end })
                : res.status(500).json({
                    messageError: "No existe la ruta",
                    details: false,
                });
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = mapController;
