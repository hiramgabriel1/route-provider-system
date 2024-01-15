import { Request, Response } from "express";
import employeeModel from "../models/employees.model";
import { verifyPasswordSecurity } from "../validators/bcrypt.config";

class sessionController {
  async validateSessionInput(req: Request, res: Response) {
    try {
      const { username, role, password } = req.body;
      const verifySessionAndTypeRole = await employeeModel.find({
        username: username,
        role: role,
      });
      let isValid = false;
      verifySessionAndTypeRole
        ? (isValid = await verifyPasswordSecurity(
            password,
            verifySessionAndTypeRole[0].password
          ))
        : res.status(400).json({ message: "user not found", details: false });

      isValid
        ? res
            .status(200)
            .json({ message: "user found", response: verifySessionAndTypeRole })
        : res
            .status(400)
            .json({ message: "Contrasenia incorrecta", details: false });
    } catch (error) {
      res.status(500).json({ messageError: error });
      console.error(error);
    }
  }
}

export default sessionController;
