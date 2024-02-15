import { Request, Response, Router } from "express";
import productsController from "../controllers/products.controllers";
import cacheInit from "../middlewares/cache.config";

const controllerProducts = new productsController();
const routerProducts = Router();
const path = "/api/v1";

routerProducts.get(
  `${path}/products`,
  cacheInit,
  (req: Request, res: Response) => {
    controllerProducts.getProducts(req, res);
  }
);

routerProducts.get(
  `${path}/product/:productId`,
  cacheInit,
  (req: Request, res: Response) => {
    controllerProducts.getProductById(req, res);
  }
);

routerProducts.post(`${path}/products/new`, (req: Request, res: Response) => {
  controllerProducts.createProduct(req, res);
});

routerProducts.patch(
  `${path}/products/edit/:productId`,
  (req: Request, res: Response) => {
    controllerProducts.editProduct(req, res);
  }
);

routerProducts.delete(
  `${path}/products/delete/:productId`,
  cacheInit,
  (req: Request, res: Response) => {
    controllerProducts.deleteProduct(req, res);
  }
);

export default routerProducts;

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
