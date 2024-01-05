import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const SECRET_KEY = "tu_clave_secreta";

export const generateToken = (userData:Object) => {
  return jwt.sign(userData, SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: "Tu petición no tiene cabecera de autorización" });
  }

  const token = req.headers.authorization.split(" ")[1];
  let payload;

  try {
    payload = jwt.decode(token, SECRET_KEY);
  } catch (error) {
    return res.status(401).send({ message: "Token inválido" });
  }

  const currentUnixTime = Math.floor(Date.now() / 1000); // Obtener el tiempo actual en formato UNIX
  if (payload.exp <= currentUnixTime) {
    // El token ha expirado
    return res.status(401).send({ message: "El token ha expirado" });
  }

  req.userdata = payload.sub;
  next();
};

export const destroyToken = (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    // Crear un nuevo token con un tiempo de expiración muy corto (1 segundo)
    const newToken = jwt.sign({}, "", { expiresIn: 1 });
    res.send({ msg: "Has sido desconectado", newToken });
  } catch (err) {
    console.error("Error al intentar destruir el token:", err);
    res.status(500).send({ msg: "Error al intentar destruir el token" });
  }
};
