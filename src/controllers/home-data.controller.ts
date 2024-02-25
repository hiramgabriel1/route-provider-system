import { Request, Response } from "express";
import employeeModel from "../models/employees.model";
import productMarks from "../models/products.model";
import rutasModels from "../models/rutas.model";

class homeDataController {
  async getCountData(req: Request, res: Response) {
    try {
      const renderEmployeesLength = await employeeModel.countDocuments();
      const renderRoutesLength = await rutasModels.countDocuments();
      const renderProductLength = await productMarks.countDocuments();

      renderEmployeesLength
        ? res.status(200).json({
            message: {
              employees: renderEmployeesLength,
              routes: renderRoutesLength,
              products: renderProductLength,
            },
            details: true,
          })
        : res.status(500).json({ messageError: "error", details: false });
    } catch (error) {
      console.log(error);
    }
  }
}

export default homeDataController;
