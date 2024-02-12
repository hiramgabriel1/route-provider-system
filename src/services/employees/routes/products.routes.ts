import { Request, Response, Router } from "express";
import products from "../controllers/products.controllers";
import cacheInit from "../../../middlewares/cache.config";

const routerMarkProducts = Router();
const path = "/api/v1/employees/products";
const productsControllers = new products();

// ? endpoint para crear un producto
// routerMarkProducts.post(`${path}/create-product`, (req: Request, res: Response) => {
//     productsControllers.createProduct(req, res)
// })

// ? endpoint para marcar como vendidos
routerMarkProducts.post(
  `${path}/mark-sold/:productId`,
  (req: Request, res: Response) => {
    productsControllers.markProductIsSold(req, res);
  }
);

// ? endpoint para mostrar los que no fueron vendidos
routerMarkProducts.get(
  `${path}/unsolds-products`,
  cacheInit,
  (req: Request, res: Response) => {
    productsControllers.showProductsUnsolds(req, res);
  }
);

// ? endpoint para mostrar los que ya fueron vendidos
routerMarkProducts.get(
  `${path}/solds-products`,
  cacheInit,
  (req: Request, res: Response) => {
    productsControllers.showProductsSolds(req, res);
  }
);

routerMarkProducts.get(
  `${path}/scan-product/:idproduct`,
  cacheInit,
  (req: Request, res: Response) => {
    productsControllers.scanProduct(req, res);
  }
);


export default routerMarkProducts;