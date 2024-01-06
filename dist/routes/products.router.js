"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controllers_1 = __importDefault(require("../controllers/products.controllers"));
const cache_config_1 = __importDefault(require("../middlewares/cache.config"));
const controllerProducts = new products_controllers_1.default();
const routerProducts = (0, express_1.Router)();
const path = "/api/v1";
routerProducts.get(`${path}/rutas`, cache_config_1.default, (req, res) => {
    controllerProducts.getProducts(req, res);
});
routerProducts.get(`${path}/rutas/:productId`, cache_config_1.default, (req, res) => {
    controllerProducts.getProductById(req, res);
});
routerProducts.post(`${path}/rutas/new`, (req, res) => {
    controllerProducts.createProduct(req, res);
});
routerProducts.patch(`${path}/rutas/edit/:productId`, (req, res) => {
    controllerProducts.editProduct(req, res);
});
routerProducts.delete(`${path}/rutas/:productId`, cache_config_1.default, (req, res) => {
    controllerProducts.deleteProduct(req, res);
});
exports.default = routerProducts;
