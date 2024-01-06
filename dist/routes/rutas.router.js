"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rutas_controllers_1 = __importDefault(require("../controllers/rutas.controllers"));
const cache_config_1 = __importDefault(require("../middlewares/cache.config"));
const controllerRutas = new rutas_controllers_1.default();
const routerRutas = (0, express_1.Router)();
const path = "/api/v1";
routerRutas.get(`${path}/rutas`, cache_config_1.default, (req, res) => {
    controllerRutas.getRutas(req, res);
});
routerRutas.get(`${path}/rutas/:rutaId`, cache_config_1.default, (req, res) => {
    controllerRutas.getRutaById(req, res);
});
routerRutas.post(`${path}/rutas/new`, (req, res) => {
    controllerRutas.createRuta(req, res);
});
routerRutas.patch(`${path}/rutas/edit/:rutaId`, (req, res) => {
    controllerRutas.editRuta(req, res);
});
routerRutas.delete(`${path}/rutas/:rutaId`, cache_config_1.default, (req, res) => {
    controllerRutas.deleteRutas(req, res);
});
exports.default = routerRutas;
