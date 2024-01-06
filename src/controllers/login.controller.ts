import { Request, Response } from "express";
import { LoginSystem } from "../services/login";
const LoginSystemServices = new LoginSystem();

class LoginController {
  async loginUser(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400).json({ error: "Nombre de usuario y contraseña son requeridos" });
        return;
      }

      const userdata = await LoginSystemServices.loginUser(username, password);

      if (userdata === undefined) {
        res.status(404).json({ error: "El usuario no existe, debes registrarte" });
      } else if (userdata) {
        req.session.user=userdata
        res.send({ msg: 'success', user: userdata });
      } else {
        res.status(401).json({ error: "Contraseña incorrecta" });
      }

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  }

  async registerUser(req: Request, res: Response) {
    try {
      const { user, username, lastname, role, password } = req.body;

      if (!user || !username || !lastname || role === undefined || !password) {
        res.status(400).json({ error: "Nombre de usuario y contraseña son requeridos" });
        return;
      }

      const result = await LoginSystemServices.registerUser(user, username, lastname, role, password);

      result
      ? (req.session.user = result, res.json({ message: "Usuario registrado exitosamente" }))
        : res.status(400).json({ error: "Ya existe el usuario" });
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      // Destruir la sesión
      req.session.destroy((err) => {
        if (err) {
          console.error("Error al cerrar sesión:", err);
          res.status(500).json({ error: "Error en el servidor" });
        } else {
          res.json({ message: "Cierre de sesión exitoso" });
        }
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  }
}

export default LoginController;
