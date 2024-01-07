import { Request, Response, Router } from "express";
import sessionController from "../controllers/session.controller";

const session = new sessionController();
const routerSession = Router();
const path = "/api/v1";

// input session 
routerSession.post(`${path}/validate-session`, (req, res) => {
  session.validateSessionInput(req, res)
})

// new session to user
// routerSession.post(`${path}/new-session`, (req, res)=> {
//   session.createNewSessionUser(req, res)
// })

// remove session to user
// routerSession.delete(`${path}/remove-session`, (()))


export default routerSession;