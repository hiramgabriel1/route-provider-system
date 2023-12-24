import { Request, Response, Router } from "express";
import unitCarsController from "../controllers/units-cars.controllers";
import cacheInit from "../middlewares/cache.config";

const unitCar = new unitCarsController();
const path = "/api/v1";
const routerUnitCars = Router();

// todo: render all cars unit
routerUnitCars.get(
  `${path}/cars-units`,
  cacheInit,
  (req: Request, res: Response) => {
    unitCar.getCarsUnit(req, res);
  }
);

// todo: create a new unit car
routerUnitCars.post(`${path}/car-unit/new`, (req: Request, res: Response) => {
  unitCar.createCarUnit(req, res);
});

// todo: edit a unit car PENDIENTE POR HACER
// routerUnitCars.patch(
//   `${path}/car-unit/edit/:id`,
//   (req: Request, res: Response) => {
//     routerUnitCars.modifyUnitCar(req, res)
// }
// );

// todo: delete a unit car
routerUnitCars.delete(
  `${path}/car-unit/delete/:id`,
  (req: Request, res: Response) => {
    unitCar.deleteCarUnit(req, res);
  }
);

export default routerUnitCars;
