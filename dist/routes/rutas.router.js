"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rutas_controllers_1 = __importDefault(require("../controllers/rutas.controllers"));
const controllerRutas = new rutas_controllers_1.default();
const routerRutas = (0, express_1.Router)();
const path = "/api/v1";
routerRutas.get(`${path}/rutas`, (req, res) => {
    controllerRutas.getRutas(req, res);
});
routerRutas.get(`${path}/rutas/:rutaId`, (req, res) => {
    controllerRutas.getRutaById(req, res);
});
routerRutas.post(`${path}/rutas/new`, (req, res) => {
    controllerRutas.createRuta(req, res);
});
routerRutas.patch(`${path}/rutas/edit/:rutaId`, (req, res) => {
    controllerRutas.editRuta(req, res);
});
routerRutas.delete(`${path}/rutas/delete/:rutaId`, (req, res) => {
    controllerRutas.deleteRutas(req, res);
});
exports.default = routerRutas;
/**
 * @swagger
 * /api/v1/rutas:
 *  get:
 *    summary: Obtener todos los rutas
 *    tags:
 *      - administrador
 *    responses:
 *      200:
 *        description: muestra un json con información de todos los rutas
 *      500:
 *        description: error interno del servidor
 *
 *
 *
 * /api/v1/rutas/:rutaID:
 *  get:
 *    summary: Obtener información del ruta por su id
 *    tags:
 *      - administrador
 *    responses:
 *      200:
 *        description: muestra un json con información de la ruta específica
 *      404:
 *        description: no se ha encontrado el ruta buscado
 *      500:
 *        description: error interno del servidor
 *
 *
 *
 *
 * /api/v1/rutas/new:
 *  post:
 *    summary: Te permite crear un nuevo ruta
 *    tags:
 *      - administrador
 *    responses:
 *      200:
 *        description: te devuelve un 200 además del ruta creado
 *        content:
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
 *
 *
 *             example:
 *               "empleado": "5fec5a7a9301a02984aef36b",
 *               "vehicle": "5fec5a7a9301a02984aef36c",
 *               "start": [40.7128, -74.0060],
 *               "end": [34.0522, -118.2437],
 *               "status": true,
 *               "amountOfMerchandise": 100,
 *               "LastMinuteSale": "Oferta especial en productos perecederos"
 *
 *
 *      404:
 *        description: no se ha podido crear el ruta
 *      500:
 *        description: error interno del servidor
 *
 *
 *
 *
 *
 * /api/v1/rutas/delete/rutaId:
 *  delete:
 *    summary: Eliminar una ruta
 *    tags:
 *      - administrador
 *    responses:
 *      200:
 *        description: muestra un json con los datos de la ruta eliminada
 *      500:
 *        description: error interno del servidor
 *
 *
 *
 *
 * /api/v1/rutas/edit/:rutaId:
 *  patch:
 *    summary: Editar una ruta
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
