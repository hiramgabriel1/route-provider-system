import { Request, Response } from "express";
// import { LoginSystem } from "../services/login";
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
      const { username, role, password } = req.body;

      const verifySessionAndTypeRole = await employeeModel
        .find({
          username: username,
          role: role,
        })
        .exec();

      verifySessionAndTypeRole.length > 0
        ? (await verifyPasswordSecurity(
            password,
            verifySessionAndTypeRole[0].password
          ))
          ? { response: true, data: verifySessionAndTypeRole }
          : { response: false, message: "Contraseña incorrecta" }
        : { response: false, message: "Usuario no encontrado" };
    } catch (error) {
      res.status(500).json({ messageError: error });
      console.error(error);
    }
  }
}

export default sessionController;
