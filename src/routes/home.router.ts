import { Request, Response, Router } from "express";
import homeController from "../controllers/home.controller";
import cacheInit from "../middlewares/cache.config";

const home = new homeController();
const path = "/api/v1";
const routerHome = Router();


routerHome.get(`${path}/home`, (req: Request, res: Response) => {
  home.getDataParams(req, res);
});

export default routerHome;