import employeeModel from "../models/employees.model";
import {verifyPasswordSecurity,encryptPasswordSecurity} from "../validators/bcrypt.config";

export class LoginSystem {

  async loginUser(username: string, password: string) {
    try {
      const usuario = await employeeModel.findOne({ where: { nombre: username } });

      if (!usuario) {
        console.log("Usuario no encontrado");
        return undefined;
      }

      const passwordValid =await verifyPasswordSecurity(password, usuario.password);

      passwordValid
        ?  true // console.log("Inicio de sesión exitoso")
        : false //console.log("Contraseña incorrecta");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  }

  async registerUser(username: string, password: string) {
    try {
      const usuario = await employeeModel.findOne({ where: { nombre: username } });

      if (usuario) {
        console.log("Ya existe el usuario");
        return false;
      }

      const passwordHash = await encryptPasswordSecurity(password);
      await employeeModel.create({
        nombre: username,
        password: passwordHash,
        rol: false,
      });

      console.log("Usuario registrado exitosamente");

      return true
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  }

  async logout(){
    //implementar logica
  }

}
export default LoginSystem
