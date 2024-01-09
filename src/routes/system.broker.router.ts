import { Request, Response, Router } from "express";
import systemBroker from "../controllers/system.broker.controller";
import cacheInit from "../middlewares/cache.config";

const system = new systemBroker();
const routerBrokerCourt = Router();
const path = "/api/v1";

routerBrokerCourt.get(
  `${path}/view-history/:id`,
  cacheInit,
  (req: Request, res: Response) => {
    system.viewHistoryCourt(req, res);
  }
);

routerBrokerCourt.post(`${path}/close-court`, (req: Request, res: Response) => {
  system.closeCourt(req, res);
});

export default routerBrokerCourt;
