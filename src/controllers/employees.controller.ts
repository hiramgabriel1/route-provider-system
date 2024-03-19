import { Request, Response } from "express";
import employeeModel from "../models/employees.model";
import {Historial} from "../interfaces/interface";
import { info } from "console";

class employees {
  async getEmployees(req: Request, res: Response) {
    try {
      const renderData = await employeeModel.find();

      const filterEmployees = renderData.filter(
        (employee) => employee.role === "empleado"
      );

      renderData
        ? res.status(200).json({ message: filterEmployees, details: true })
        : res.status(500).json({
            messageError: "error internal",
            details: false,
          });
    } catch (error) {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async getEmployeeById(req: Request, res: Response) {
    try {
      const { employeeId } = req.params;

      // ? search if exists user by id
      const foundUserById = await employeeModel.findById(employeeId);

      foundUserById
        ? res.status(200).json(foundUserById)
        : res.status(404).json({ messageError: "not found user" });
    } catch (error) {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async editEmployee(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateFieldsDataEmployee = req.body;

      const updateUserData = await employeeModel.findOneAndUpdate(
        { _id: id },
        { $set: updateFieldsDataEmployee },
        { new: true }
      );

      updateUserData
        ? res.status(200).json({ message: updateUserData, details: true })
        : res
            .status(404)
            .json({ messageError: "error internal", details: false });
    } catch (error) {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async createEmployee(req: Request, res: Response) {
    try {
      const { user, username, lastnames, role, password } = req.body;

      const dataUser = {
        user: user,
        username: username,
        lastnames: lastnames,
        role: role,
        password: password,
      };

      // todo: verify data
      const isExists = await employeeModel.findOne({
        user: dataUser.user,
        password: dataUser.password,
      });

      if (isExists) {
        return res.json({ message: "el usuario ya éxiste", details: dataUser });
      }

      const createUser = await employeeModel.create(dataUser);

      createUser
        ? res.status(200).json({ message: "creado éxitosamente" })
        : res.status(500).json({ message: "no se logró guardar usuario" });
    } catch (error) {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async deleteEmployee(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleteEmployee = await employeeModel.findByIdAndDelete(id);

      deleteEmployee
        ? res.status(200).json({
            message: "deleted successfully!",
            details: deleteEmployee,
            response: true,
          })
        : res

            .status(404)
            .json({ messageError: "deleted error", details: false });
    } catch (error) {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async addRecorderHistory(res: Response, data: Historial) {
    try {
      const { employeID, action,date } = data;

      const movimiento={
        action,
        date
      }
  
      const empleado = await employeeModel.findById(employeID);
  
      if (!empleado) {
        return res.status(500).json({ error: "Employee not found" });
      }
  
      empleado.recorder.push({ movimiento });
  
      await empleado.save();
  
      return res.status(200).json({
        message: "Historial agregado exitosamente",
        response: true,
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

class routesEmployees extends employees {
  async getEmployeeRoute(req: Request, res: Response) {
    try {
      res.send("hello world");
    } catch (error) {
      console.error(error);
    }
  }
}

export { employees, routesEmployees };
