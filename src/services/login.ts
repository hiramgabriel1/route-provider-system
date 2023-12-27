import Usuario from "../models/login.model";
import {
  verifyPasswordSecurity,
  encryptPasswordSecurity,
} from "../validators/bcrypt.config";

export class LoginSystem {
  async loginUser(username: string, password: string) {
    try {
      const usuario = await Usuario.findOne({ where: { nombre: username } });

      if (!usuario) {
        console.log("Usuario no encontrado");
        return;
      }

      const passwordValid = "s"; //await verifyPasswordSecurity(password, usuario.password);

      passwordValid
        ? console.log("Inicio de sesión exitoso")
        : console.log("Contraseña incorrecta");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  }

  async registerUser(username: string, password: string) {
    try {
      const usuario = await Usuario.findOne({ where: { nombre: username } });

      if (usuario) {
        console.log("Ya existe el usuario");
        return;
      }

      const passwordHash = await encryptPasswordSecurity(password);
      await Usuario.create({
        nombre: username,
        password: passwordHash,
        rol: false,
      });

      console.log("Usuario registrado exitosamente");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  }
}
