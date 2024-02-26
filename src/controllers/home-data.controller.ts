import { Request, Response } from "express";
import employeeModel from "../models/employees.model";
import productMarks from "../models/products.model";
import rutasModels from "../models/rutas.model";

class homeDataController {
  async getCountData(req: Request, res: Response) {
    try {
      const renderData = await employeeModel.find();
      const filterEmployees = renderData.filter(
        (employee) => employee.role === "empleado"
      );

      const renderRoutesLength = await rutasModels.estimatedDocumentCount();
      const renderProductLength = await productMarks.estimatedDocumentCount();

      renderData != null
        ? res.status(200).json({
            message: {
              employees: filterEmployees.length,
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
