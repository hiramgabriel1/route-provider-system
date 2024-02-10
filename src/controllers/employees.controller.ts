import { Request, Response } from "express";
import employeeModel from "../models/employees.model";
import { encryptPasswordSecurity } from "../validators/bcrypt.config";

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
          messageError: "error internal brother, de pana xd",
          details: false,
        });
    } catch (error) {
      console.error(error);
    }
  }

  async getEmployeeById(req: Request, res: Response) {
    try {
      const { employeeId } = req.params;

      // ? search if exists user by id
      const foundUserById = await employeeModel.findById(employeeId);

      foundUserById
        ? res.status(200).json(foundUserById)
        : res.status(404).json({ messageError: "not found user de pana xd" });
    } catch (error) {
      console.error(error);
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
      console.error(error);
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
        password: await encryptPasswordSecurity(password),
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
      console.error(error);
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
      console.error(error);
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
