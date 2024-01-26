import { Request, Response, Router } from "express";
import {
  employees,
  routesEmployees,
} from "../controllers/employees.controller";
import cacheInit from "../middlewares/cache.config";

const employeesController = new employees();
const subRoutesEmployees = new routesEmployees();
const routerEmployees = Router();
const path = "/api/v1";

// todo: render all employees
routerEmployees.get(
  `${path}/employees`,
  cacheInit,
  (req: Request, res: Response) => {
    employeesController.getEmployees(req, res);
  }
);

// todo: render employee by id
routerEmployees.get(
  `${path}/employee/:employeeId`,
  (req: Request, res: Response) => {
    employeesController.getEmployeeById(req, res);
  }
);

// todo: create a new employee
routerEmployees.post(`${path}/employee/new`, (req: Request, res: Response) => {
  employeesController.createEmployee(req, res);
});

// todo: edit a employee PENDIENTE POR HACER
routerEmployees.patch(
  `${path}/employee/edit/:id`,
  (req: Request, res: Response) => {
    employeesController.editEmployee(req, res);
  }
);

// todo: delete a employee
routerEmployees.delete(
  `${path}/employee/delete/:id`,
  (req: Request, res: Response) => {
    employeesController.deleteEmployee(req, res);
  }
);

export default routerEmployees;
