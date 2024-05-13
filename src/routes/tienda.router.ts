import { Request, Response, Router } from "express";
import tiendaController from "../controllers/tienda.controller";

const tiendasController = new tiendaController();
const routerTienda = Router();
const path = "/api/v1";

// todo: render all tiendas
routerTienda.get(`${path}/tiendas`, (req: Request, res: Response) => {
  tiendasController.getTiendas(req, res);
});

// todo: render tienda by id
routerTienda.get(`${path}/tienda/:idTienda`, (req: Request, res: Response) => {
  tiendasController.getTiendasById(req, res);
});

// todo: create a new tienda
routerTienda.post(`${path}/tienda/new`, (req: Request, res: Response) => {
  tiendasController.createTienda(req, res);
});

// todo: edit a tienda PENDIENTE POR HACER
routerTienda.patch(
  `${path}/tienda/edit/:idTienda`,
  (req: Request, res: Response) => {
    tiendasController.editTienda(req, res);
  }
);

// todo: delete a tienda
routerTienda.delete(
  `${path}/tienda/delete/:idTienda`,
  (req: Request, res: Response) => {
    tiendasController.deleteTienda(req, res);
  }
);

routerTienda.post(
  `${path}/tienda/addproduct/:idTienda`,
  (req: Request, res: Response) => {
    tiendasController.addProductToTienda(req, res);
  }
);

routerTienda.patch(
  `${path}/tienda/rempleaceproducts/:idTienda`,
  (req: Request, res: Response) => {
    tiendasController.rempleaceProducts(req, res);
  }
);

routerTienda.patch(
  `${path}/tienda/editproduct/:idTienda/:idProduct`,
  (req: Request, res: Response) => {
    tiendasController.editProductTienda(req, res);
  }
);

routerTienda.post(`${path}/create-mercancia`, (req: Request, res: Response) => {
  tiendasController.createMercancia(req, res);
});

routerTienda.get(`${path}/show-mercancia`, (req: Request, res: Response) => {
  tiendasController.getMercancia(req, res);
});

routerTienda.post(`${path}/create-efectivo`, (req: Request, res: Response) => {
  tiendasController.editProductTienda(req, res);
});

routerTienda.get(`${path}/show-efectivo`, (req: Request, res: Response) => {
  tiendasController.editProductTienda(req, res);
});

routerTienda.put(`${path}/add-util`, (req: Request, res: Response) => {
  tiendasController.utilsStoreProducts(req, res);
});

export default routerTienda;
