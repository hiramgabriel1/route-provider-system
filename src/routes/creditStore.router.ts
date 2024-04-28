import { Request, Response, Router } from "express";
import creditStore from "../controllers/creditStore.controller";

const credit = new creditStore();
const creditStoreRouter = Router();
const path = "/api/v1";

creditStoreRouter.get(
  `${path}/creditstore/showCreditStore/:nameStore`,
  (req: Request, res: Response) => {
    credit.showCreditStoreByName(req, res);
  }
);

creditStoreRouter.post(`${path}/credit`, (req: Request, res: Response) => {
  credit.addCreditToNewStore(req, res);
});

creditStoreRouter.put(
  `${path}/creditstore/edit/:nameStore`,
  (req: Request, res: Response) => {
    credit.editCreditStore(req, res);
  }
);

creditStoreRouter.delete(
  `${path}/creditstore/delete/:nameStore`,
  (req: Request, res: Response) => {
    credit.deleteCreditStore(req, res);
  }
);

export default creditStoreRouter;
