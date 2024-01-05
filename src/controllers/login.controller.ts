// import { Request, Response } from "express";
// import { LoginSystem } from "../services/login";
// import { destroyToken,verifyToken,generateToken } from "../validators/jwt.config";


// const LoginSystemServices = new LoginSystem();

// class loginController {
//   async loginUser(req: Request, res: Response) {
//     try {
//       const { username, password } = req.body;

//       if (!username || !password) {
//         res
//           .status(400)
//           .json({ error: "Nombre de usuario y contraseña son requeridos" });
//         return;
//       }

//       const userdata = await LoginSystemServices.loginUser(username, password);

//       userdata === undefined
//   ? res.status(404).json({ error: "El usuario no existe, debes registrarte" })
//   : userdata
//   ? (() => {
//     const token = generateToken({ userdata: userdata });
//           res.send({msg:'success', token:token})
//     })()
//   : res.status(401).json({ error: "Contraseña incorrecta" });

//     } catch (error) {
//       console.error("Error al iniciar sesión:", error);
//       res.status(500).json({ error: "Error en el servidor" });
//     }
//   }

//   async registerUser(req: Request, res: Response) {
//     try {
//       const { user, username,lastname,role, password } = req.body;

//       if (!user || !username||!lastname||role===undefined||!password) {
//         res
//           .status(400)
//           .json({ error: "Nombre de usuario y contraseña son requeridos" });
//         return;
//       }
      
//       const result = await LoginSystemServices.registerUser(user,username,lastname,role, password);
      
//       result
//         ? res.json({ message: "Usuario registrado exitosamente" })
//         : res.status(400).json({ error: "Ya existe el usuario" });
//     } catch (error) {
//       console.error("Error al registrar usuario:", error);
//       res.status(500).json({ error: "Error en el servidor" });
//     }
//   }

//   async logout(req: Request, res: Response) {
//    try{
//     destroyToken(req, res);
//    }catch(error){
//     res.status(500).json({ error: "Error en el servidor" });
//    }
//   }
// }

// export default loginController;
