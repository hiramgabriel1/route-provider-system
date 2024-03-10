import employeeModel from "../models/employees.model";
import {
  verifyPasswordSecurity,
} from "../validators/bcrypt.config";

export class LoginSystem {
  async loginUser(username: string, password: string) {
    try {
      const usuario = await employeeModel.findOne({
        where: { nombre: username },
      });
      if (!usuario) {
        console.log("Usuario no encontrado");
        return undefined;
      }

      const passwordValid = await verifyPasswordSecurity(
        password,
        usuario.password
      );

      passwordValid ? usuario : false; //Contraseña incorrecta
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  }

  async registerUser(
    user: String,
    username: string,
    lastnames: String,
    password: string,
    rol: Boolean
  ) {
    try {
      const usuario = await employeeModel.findOne({
        where: { nombre: username },
      });

      if (usuario) {
        console.log("Ya existe el usuario");
        return false;
      }

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
