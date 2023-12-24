import { Request, Response, Router } from "express";
import homeController from "../../controllers/home/home.controller";
import cacheInit from "../../middlewares/cache.config";

const home = new homeController();
const path = "/api/v1";
const routerHome = Router();

routerHome.get(`${path}/home`, cacheInit, (req: Request, res: Response) => {
  home.getDataParams(req, res);
});

// routerHome.get()

export default routerHome;
