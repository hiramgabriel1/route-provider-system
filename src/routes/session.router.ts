import { Request, Response, Router } from "express";
import sessionController from "../controllers/session.controller";


const session = new sessionController();
const routerSession = Router();
const path = "/api/v1";

routerSession.post(`${path}/createtoken`,(req:Request,res:Response)=>{
  session.createToken(req,res)
})


export default routerSession;

/**
 * @swagger
 *   /api/v1/createtoken:
 *    post:
 *      summary: Crea token a partir de los datos del ususario
 *      tags:
 *        - administrador
 *      responses:
 *        200:
 *          description: muestra un token
 *        404:
 *          description: el usuario no fue encontrado
 *        500:
 *          description: error interno del servidor
 *   
 *   example:
 *      user{
 *        "username": "pepito"
 *        "rol": "empleado"
 *        "password": "Pepito123"
 *        }
 */