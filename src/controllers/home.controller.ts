import { Request, Response } from "express";
import employeeModel from "../models/employees.model";
import { productMarks } from "../services/employees/models/products";
import rutasModels from "../models/rutas.model";

class homeController {
  async getDataParams(__req: Request, res: Response) {
    try {
      const getUsersAll = await employeeModel.find();
      const totalRoutes = await rutasModels.find();
      const productsTotal = await productMarks.find();

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

      res.status(200).json({
        filterTypeUser: filterUserToTypeRole,
        numberEmployees: convertObjectToArray.length,
        productsTotal: productsTotal,
        totalRoutesActivas: totalRoutes.length,
      });
      
    } catch (error) {
      console.error(error);
    }
  }
}

export default homeController;
