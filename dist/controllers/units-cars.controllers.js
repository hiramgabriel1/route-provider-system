"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const units_model_1 = __importDefault(require("../models/units.model"));
class unitCarsController {
    async getCarsUnit(req, res) {
        try {
            const renderCarUnits = await units_model_1.default.find();
            renderCarUnits
                ? res.status(200).json({ message: renderCarUnits, details: true })
                : res.status(500).json({ messageError: "error", details: false });
        }
        catch (error) {
            console.error(error);
        }
    }
    async createCarUnit(req, res) {
        try {
            const { marca, modelo, lastOilChange, nextOilChange } = req.body;
            const dataCarUnitReceived = {
                marca: marca,
                modelo: modelo,
                lastOilChange: lastOilChange,
                nextOilChange: nextOilChange,
            };
            const saveUnitCarInDatabase = await units_model_1.default.create(dataCarUnitReceived);
            saveUnitCarInDatabase
                ? res
                    .status(200)
                    .json({ message: saveUnitCarInDatabase, details: true })
                : res
                    .status(500)
                    .json({ messageError: "error internal", details: false });
        }
        catch (error) {
            console.error(error);
        }
    }
    async modifyUnitCar(req, res) {
        try {
            const { id } = req.params;
            const carUnitModify = req.body;
            const modifyUnit = await units_model_1.default.findByIdAndUpdate({ _id: id }, { $set: carUnitModify }, { new: true });
            modifyUnit
                ? res
                    .status(200)
                    .json({ message: "modify data successfully!", details: modifyUnit })
                : res.status(404).json({ message: "error", details: false });
        }
        catch (error) {
            console.error(error);
        }
    }
    async deleteCarUnit(req, res) {
        try {
            const { id } = req.params;
            const deleteUnitById = await units_model_1.default.findByIdAndDelete(id);
            deleteUnitById
                ? res.status(200).json({ message: "deleted", detials: deleteUnitById })
                : res
                    .status(404)
                    .json({ messageError: "error internal", details: false });
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = unitCarsController;
