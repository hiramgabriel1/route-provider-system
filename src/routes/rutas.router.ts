import { Request, Response, Router } from "express";
import rutasController from "../controllers/rutas.controllers";
import cacheInit from "../middlewares/cache.config";

const controllerRutas = new rutasController();
const routerRutas = Router();
const path = "/api/v1";

routerRutas.get(`${path}/rutas`, cacheInit, (req: Request, res: Response) => {
  controllerRutas.getRutas(req, res);
});

routerRutas.get(
  `${path}/rutas/:rutaId`,
  cacheInit,
  (req: Request, res: Response) => {
    controllerRutas.getRutaById(req, res);
  }
);

routerRutas.post(`${path}/rutas/new`, (req: Request, res: Response) => {
  controllerRutas.createRuta(req, res);
});

routerRutas.patch(`${path}/rutas/edit/:rutaId`, (req: Request, res: Response) => {
  controllerRutas.editRuta(req, res);
});

routerRutas.delete(
  `${path}/rutas/:rutaId`,
  cacheInit,
  (req: Request, res: Response) => {
    controllerRutas.deleteRutas(req, res);
  }
);

export default routerRutas;
