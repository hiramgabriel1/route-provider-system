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

/**
 * @swagger
 * /api/v1/employees:
 *  get:
 *    summary: Obtener todos los empleados registrados
 *    tags:
 *      - administrador
 *    responses:
 *      200:
 *        description: muestra un json con información de todos los usuarios
 *      500:
 *        description: error interno del servidor
 *
 * /api/v1/employee/{employeeId}:
 *  get:
 *    summary: Obtener información del usuario por su id
 *    tags:
 *      - administrador
 *    responses:
 *      200:
 *        description: muestra un json con información del usuario específico
 *      404:
 *        description: no se ha encontrado el usuario buscado
 *      500:
 *        description: error interno del servidor
 * 
 * /api/v1/employee/new:
 *  post:
 *    summary: Te permite crear un nuevo empleado
 *    tags:
 *      - administrador
 *    responses:
 *      200:
 *        description: te devuelve un 200 además del usuario creado
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: El ID del empleado.
 *                 name:
 *                   type: string
 *                   description: El nombre del empleado.
 *                 role:
 *                   type: string
 *                   description: El rol del empleado.
 *             example:
 *               id: 1
 *               name: "Juan"
 *               role: "Administrador"
 *      404:
 *        description: no se ha encontrado el usuario buscado
 *      500:
 *        description: error interno del servidor
*/