import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado - Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWTSECRET as string, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    // Agrega la información del usuario al objeto req
    (req as any).user = user;
    next();
  });
}

export default authenticateToken;
