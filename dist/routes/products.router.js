"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controllers_1 = __importDefault(require("../controllers/products.controllers"));
const controllerProducts = new products_controllers_1.default();
const routerProducts = (0, express_1.Router)();
const path = "/api/v1";
routerProducts.get(`${path}/view-products`, (req, res) => {
    controllerProducts.getProducts(req, res);
});
routerProducts.get(`${path}/product/:productId`, (req, res) => {
    controllerProducts.getProductById(req, res);
});
routerProducts.post(`${path}/products/new`, (req, res) => {
    controllerProducts.createProduct(req, res);
});
routerProducts.patch(`${path}/products/edit/:productId`, (req, res) => {
    controllerProducts.editProduct(req, res);
});
routerProducts.delete(`${path}/products/delete/:productId`, (req, res) => {
    controllerProducts.deleteProduct(req, res);
});
exports.default = routerProducts;
/**
 * @swagger
 * /api/v1/products:
 *  get:
 *    summary: Obtener todos los productos
 *    tags:
 *      - administrador
 *    responses:
 *      200:
 *        description: muestra un json con información de todos los producros
 *      500:
 *        description: error interno del servidor
 *
 *
 *
 *
 * /api/v1/product/:productId:
 *  get:
 *    summary: Obtener información del producto por su id
 *    tags:
 *      - administrador
 *    responses:
 *      200:
 *        description: muestra un json con información del producto específico
 *      404:
 *        description: no se ha encontrado el producto buscado
 *      500:
 *        description: error interno del servidor
 *
 *
 *
 *
 *
 * /api/v1/products/new:
 *  post:
 *    summary: Te permite crear un nuevo producto
 *    tags:
 *      - administrador
 *    responses:
 *      200:
 *        description: te devuelve un 200 además del producto creado
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: El ID del producto.
 *                 name:
 *                   type: string
 *                   description: El nombre del producto.
 *                 productDescription:
 *                   type: string
 *                   description: Descripcion del producto.
 *                 productPrice:
 *                    type: number
 *                   description: Precio del producto.
 *                 productIsSolid:
 *                    type: boolean
 *                   description: Estado del producto.

 *             example:
 *               id: 1
 *               name: "Limpia pizo"
 *               productDescription: "producto para limpieza de pisos del hogar"
 *               productPrice: 1000
 *               productIsSolid: true
 *      404:
 *        description: no se ha podido crear el producto
 *      500:
 *        description: error interno del servidor
 *
 *
 *
 *
 *
 * /api/v1/products/edit/productId:
 *  patch:
 *    summary: Te permite editar un producto
 *    tags:
 *      - administrador
 *    responses:
 *      200:
 *        description: te devuelve un 200 además del producto editado
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: El ID del producto.
 *                 name:
 *                   type: string
 *                   description: El nombre del producto.
 *                 productDescription:
 *                   type: string
 *                   description: Descripcion del producto.
 *                 productPrice:
 *                    type: number
 *                   description: Precio del producto.
 *                 productIsSolid:
 *                    type: boolean
 *                   description: Estado del producto.
 *
 *      404:
 *        description: no se ha podido editar el producto
 *      500:
 *        description: error interno del servidor
 *
 *
 *
 *
 *     /api/v1/products/delete/:productId
 *      delete:
 *        summary: Eliminar una procuto
 *        tags:
 *          - administrador
 *        responses:
 *          200:
 *            description: muestra un json con los datos del producto eliminado
 *          500:
 *            description: error interno del servidor
*/
