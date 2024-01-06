"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const units_cars_controllers_1 = __importDefault(require("../controllers/units-cars.controllers"));
const cache_config_1 = __importDefault(require("../middlewares/cache.config"));
const unitCar = new units_cars_controllers_1.default();
const path = "/api/v1";
const routerUnitCars = (0, express_1.Router)();
// todo: render all cars unit
routerUnitCars.get(`${path}/cars-units`, cache_config_1.default, (req, res) => {
    unitCar.getCarsUnit(req, res);
});
// todo: create a new unit car
routerUnitCars.post(`${path}/car-unit/new`, (req, res) => {
    unitCar.createCarUnit(req, res);
});
// todo: edit a unit car 
routerUnitCars.patch(`${path}/car-unit/edit/:id`, (req, res) => {
    unitCar.modifyUnitCar(req, res);
});
// todo: delete a unit car
routerUnitCars.delete(`${path}/car-unit/delete/:id`, (req, res) => {
    unitCar.deleteCarUnit(req, res);
});
exports.default = routerUnitCars;
