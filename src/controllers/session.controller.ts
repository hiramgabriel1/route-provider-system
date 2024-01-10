import { Request, Response } from "express";
import employeeModel from "../models/employees.model";
import {
  encryptPasswordSecurity,
  verifyPasswordSecurity,
} from "../validators/bcrypt.config";

class sessionController {
  // async createNewSessionUser(req: Request, res: Response) {
  //   try {
  //     const { username, role, password } = req.body;

  //     // todo: encrypt password!

  //     const encrypt =  await encryptPasswordSecurity(password);

  //     const dataSessionUser = {
  //       username: username,
  //       role: role,
  //       password: encrypt,
  //     };

  //     console.log(dataSessionUser);

  //     // todo: save query in database
  //     const saveSession = await session.create(dataSessionUser);

  //     saveSession
  //       ? res.status(200).json({ response: saveSession })
  //       : res.status(500).json({ response: false });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async validateSessionInput(req: Request, res: Response) {
    try {
      const { username, role } = req.body;
      const verifySessionAndTypeRole = await employeeModel
        .find({
          username: username,
          role: role,
          // password:
        })
        .exec();

      verifySessionAndTypeRole.length > 0
        ? res.json({ response: "user found", data: verifySessionAndTypeRole })
        : res.json({
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
