import { Request, Response } from "express";
import employeeModel from "../models/employees.model";
import productsModel from "../models/products.model";
import rutasModels from "../models/rutas.model";

class homeController {
  async getDataParams(req: Request, res: Response) {
    try {
      const getUsersAll = await employeeModel.find();
      const totalRoutes = await rutasModels.find();
      const productsTotal = await productsModel.find();

      const convertObjectToArray = Object.values(getUsersAll);
      const filterUserToTypeRole = convertObjectToArray.filter(
        (userTypeRole) => {
          return (
            userTypeRole.role === "Administrador" ||
            userTypeRole.role === "Empleado" ||
            userTypeRole.role === "administrador" ||
            userTypeRole.role === "empleado"
          );
        }
      );

      console.log(getUsersAll);
      res.status(200).json({
        filterTypeUser: filterUserToTypeRole,
        employeesTotal: getUsersAll,
        numberEmployees: convertObjectToArray.length,
        productsTotal: productsTotal.length,
        totalRoutes: totalRoutes.length,
      });

    } catch (error) {
      console.error(error);
    }
  }
}

export default homeController;
