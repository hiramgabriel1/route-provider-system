import employeeModel from "../models/employees.model";
import { verifyPasswordSecurity } from "../validators/bcrypt.config";
import { Request, Response } from "express";

type userInterface = {
  username: string;
  password: string;
};

interface typeUserRegister {
  user: string;
  username: string;
  lastnames: string;
  password: string;
  rol: string;
}

export class LoginSystem {
  async loginUser(
    username: string,
    password: string,
    _req: Request,
    res: Response
  ) {
    try {
      const usuario: userInterface | null = await employeeModel.findOne({
        where: { nombre: username },
      });

      if (!usuario) res.json("no encontrado");

      const passwordValid = await verifyPasswordSecurity(
        password,
        usuario!.password
      );

      if (passwordValid) res.json(usuario);

      res.json("contraseña incorrecta");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  }

  async registerUser(
    user: String,
    username: string,
    lastnames: String,
    password: string,
    rol: Boolean,
    _req: Request,
    res: Response
  ) {
    try {
      const usuario: userInterface | null = await employeeModel.findOne({
        where: { nombre: username },
      });

      if (usuario) res.json("usuario ya existe");

      const usercreated = await employeeModel.create({
        user: user,
        username: username,
        lastnames: lastnames,
        password: password,
        rol: rol,
      });

      return usercreated;
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  }
}
export default LoginSystem;
