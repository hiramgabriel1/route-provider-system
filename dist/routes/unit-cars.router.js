"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const units_cars_controllers_1 = __importDefault(require("../controllers/units-cars.controllers"));
const unitCar = new units_cars_controllers_1.default();
const path = "/api/v1";
const routerUnitCars = (0, express_1.Router)();
// todo: render all cars unit
routerUnitCars.get(`${path}/cars-units`, (req, res) => {
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
/**
 * @swagger
 * /api/v1/cars-units:
 *  get:
 *    summary: Obtener todos los autos
 *    tags:
 *      - administrador
 *    responses:
 *      200:
 *        description: muestra un json con información de todos los autos
 *      500:
 *        description: error interno del servidor
 *
 *
 * /api/v1/cars-units/new:
 *  post:
 *    summary: Te permite crear un nuevo auto
 *    tags:
 *      - administrador
 *    responses:
 *      200:
 *        description: te devuelve un 200 además del auto creado
 *        content:
 *           application/json:
 *             unidadDeCarro:
 *                 type: object
 *                 properties:
 *                   marca:
 *                     type: string
 *                     description: Marca del carro.
 *                   modelo:
 *                     type: number
 *                     description: Modelo del carro.
 *                   lastOilChange:
 *                     type: string
 *                     format: date
 *                     description: Fecha de la última cambio de aceite.
 *                   nextOilChange:
 *                     type: string
 *                     format: date
 *                     description: Fecha del próximo cambio de aceite.
 *
 *
 *             example:
 *               "marca": "Toyota",
 *               "modelo": 2022,
 *               "lastOilChange": "2023-01-15",
 *               "nextOilChange": "2023-07-15"
 *      404:
 *        description: no se ha podido crear el auto
 *      500:
 *        description: error interno del servidor
 *
 *
 *
 *  * /api/v1/car-unit/delete/:id
 *  delete:
 *    summary: Eliminar una auto
 *    tags:
 *      - administrador
 *    responses:
 *      200:
 *        description: muestra un json con los datos del auto eliminado
 *      500:
 *        description: error interno del servidor
 *
 *
 *
 *
 * api/v1/car-unit/edit/:id:
 *  patch:
 *    summary: Editar un auto
 *    tags:
 *      - administrador
 *         content:
 *           application/json:
 *             ruta:
 *           type: object
 *           properties:
 *             empleado:
 *               type: string
 *               description: ID del empleado asociado al viaje.
 *             vehicle:
 *               type: string
 *               description: ID del vehículo utilizado en el viaje.
 *             start:
 *               type: array
 *               items:
 *                 type: number
 *               description: Coordenadas de inicio del viaje.
 *             end:
 *               type: array
 *               items:
 *                 type: number
 *               description: Coordenadas de fin del viaje.
 *             status:
 *               type: boolean
 *               description: Estado del viaje.
 *             amountOfMerchandise:
 *               type: number
 *               description: Cantidad de mercancía transportada en el viaje.
 *             LastMinuteSale:
 *               type: string
 *               description: Información sobre ventas de último minuto en el viaje.
 *    responses:
 *      200:
 *        description: muestra un json con los datos de la ruta editada
 *      500:
 *        description: error interno del servidor
*/
