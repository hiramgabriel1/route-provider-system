import { Request, Router, Response } from "express";
import homeDataController from "../controllers/home-data.controller";

const path = "/api/v1";

const homeDataCtrl = new homeDataController();
const routerHomeData = Router();

routerHomeData.get(`${path}/homeData`, (req: Request, res: Response) => {
  homeDataCtrl.getCountData(req, res);
});

export default routerHomeData;
