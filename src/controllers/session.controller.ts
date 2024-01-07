import { Request, Response } from "express";
import { LoginSystem } from "../services/login";
import session from "../models/session.model";
// import session from "../models/session.model";
import {
  encryptPasswordSecurity,
  verifyPasswordSecurity,
} from "../validators/bcrypt.config";

class sessionController {
  async createNewSessionUser(req: Request, res: Response) {
    try {
      const { username, role, password } = req.body;

      // todo: encrypt password!
      const encrypt = encryptPasswordSecurity(password);

      const dataSessionUser = {
        username: username,
        role: role,
        password: encrypt,
      };

      console.log(dataSessionUser);

      // todo: save query in database
      const saveSession = await session.create(dataSessionUser);

      saveSession
        ? res.status(200).json({ response: saveSession })
        : res.status(500).json({ response: false });
        
    } catch (error) {
      console.error(error);
    }
  }

  async validateSessionInput(req: Request, res: Response) {
    try {
      const { username, role, password } = req.body;

      const verifySessionAndTypeRole = await session.find({
        username: username,
        role: role,
      });

      verifySessionAndTypeRole
        ? res.json({ response: true })
        : res.json({ response: false });
    } catch (error) {
      res.status(500).json({ messageError: error });
      console.error(error);
    }
  }
}

export default sessionController;
