"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rutas_model_1 = __importDefault(require("../models/rutas.model"));
class rutasController {
    async getRutas(req, res) {
        try {
            const rutas = await rutas_model_1.default.find();
            rutas
                ? res.status(200).json({ message: rutas, details: true })
                : res.status(404).json({ message: "No existen rutas", details: false });
        }
        catch (error) {
            console.log(error);
        }
    }
    async getRutaById(req, res) {
        try {
            const { rutaId } = req.params;
            const ruta = await rutas_model_1.default.findById(rutaId);
            ruta
                ? res.status(200).json({ message: ruta, details: true })
                : res.status(404).json({ message: "No existen rutas", details: false });
        }
        catch (error) {
            console.error(error);
        }
    }
    async editRuta(req, res) {
        try {
            const { rutaId } = req.params;
            const updateDataRuta = req.body;
            const updateUserData = await rutas_model_1.default.findOneAndUpdate({ _id: rutaId }, { $set: updateDataRuta }, { new: true });
            updateUserData
                ? res.status(200).json({ message: updateDataRuta, details: true })
                : res.status(404).json({ message: "No existen rutas", details: false });
        }
        catch (error) {
            console.log(error);
        }
    }
    async createRuta(req, res) {
        try {
            const { empleado, vehicle, start, end, status, amountOfMerchandise, LastMinuteSale, } = req.body;
            const dataUser = {
                empleado: empleado,
                vehicle: vehicle,
                start: start,
                end: end,
                status: status,
                amountOfMerchandise: amountOfMerchandise,
                LastMinuteSale: LastMinuteSale,
            };
            // todo: verify data
            const isExists = await rutas_model_1.default.findOne({
                empleado,
                vehicle,
                start,
                end,
                status,
                amountOfMerchandise,
                LastMinuteSale,
            });
            if (isExists) {
                return res.json({ message: "La ruta ya existe", details: dataUser });
            }
            const createRuta = await rutas_model_1.default.create(dataUser);
            if (createRuta) {
                return res.status(200).json({ message: "Ruta creada exitosamente" });
            }
            else {
                return res.status(500).json({ message: "No se logró crear la ruta" });
            }
        }
        catch (error) {
            return res.status(500).json({
                message: "Error en el servidor",
                details: error,
            });
        }
    }
    async deleteRutas(req, res) {
        try {
            const { rutaId } = req.params;
            const deleteRuta = await rutas_model_1.default.findByIdAndDelete(rutaId);
            deleteRuta
                ? res.status(200).json({
                    message: "Deleted successfully!",
                    details: deleteRuta,
                    response: true,
                })
                : res
                    .status(404)
                    .json({ messageError: "Delete error", details: false });
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = rutasController;
