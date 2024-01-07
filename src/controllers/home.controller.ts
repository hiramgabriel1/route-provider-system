import { Request, Response } from "express";
import employeeModel from "../models/employees.model";

class homeController {
  async getDataParams(req: Request, res: Response) {
    try {
      const getUsersAll = await employeeModel.find();

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
      res.json({ response: filterUserToTypeRole });
    } catch (error) {
      console.error(error);
    }
  }
}

export default homeController;
