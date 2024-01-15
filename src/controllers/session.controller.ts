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
      const isValid = await verifyPasswordSecurity(
        password,
        verifySessionAndTypeRole[0].password
      );

      if (isValid)
        return res
          .status(200)
          .json({ message: "user found", response: verifySessionAndTypeRole });

      verifySessionAndTypeRole.length > 0
        ? res.json({ response: "user found", data: verifySessionAndTypeRole })
        : res.status(404).json({
            response: "user not found",
            data: verifySessionAndTypeRole,
          });
    } catch (error) {
      res.status(500).json({ messageError: error });
      console.error(error);
    }
  }
}

export default sessionController;
