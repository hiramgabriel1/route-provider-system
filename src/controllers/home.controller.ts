import { Request, Response } from "express";
import employeeModel from "../models/employees.model";

class homeController {
  async getDataParams(req: Request, res: Response) {
    try {
      const getUsersAll = await employeeModel.find();

      const convertObjectToArray = Object.values(await getUsersAll);
      const filterUserAdmin = convertObjectToArray.filter((userTypeRole) => {
        return userTypeRole.role === "administrador";
      });

      const filterUserEmployee = convertObjectToArray.filter((userTypeRole) => {
        return userTypeRole.role === "empleado";
      });

      console.log(filterUserAdmin);

      res.json({ response: convertObjectToArray });
    } catch (error) {
      console.error(error);
    }
  }
}

export default homeController;
