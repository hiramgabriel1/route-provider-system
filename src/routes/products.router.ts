import { Request, Response, Router } from "express";
import productsController from "../controllers/products.controllers";
import cacheInit from "../middlewares/cache.config";

const controllerProducts = new productsController();
const routerProducts = Router();
const path = "/api/v1";

routerProducts.get(`${path}/rutas`, cacheInit, (req: Request, res: Response) => {
  controllerProducts.getProducts(req, res);
});

routerProducts.get(
  `${path}/rutas/:productId`,
  cacheInit,
  (req: Request, res: Response) => {
    controllerProducts.getProductById(req, res);
  }
);

routerProducts.post(`${path}/rutas/new`, (req: Request, res: Response) => {
  controllerProducts.createProduct(req, res);
});

routerProducts.patch(`${path}/rutas/edit/:productId`, (req: Request, res: Response) => {
  controllerProducts.editProduct(req, res);
});

routerProducts.delete(
  `${path}/rutas/:productId`,
  cacheInit,
  (req: Request, res: Response) => {
    controllerProducts.deleteProduct(req, res);
  }
);

export default routerProducts;
