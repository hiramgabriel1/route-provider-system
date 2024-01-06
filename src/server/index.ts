// import morgan from "morgan";
import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connection from "../db/[mongo]connection";
import http from "http";
import colors from "colors";
import routerHome from "../routes/home.router";
import routerEmployees from "../routes/employees.router";
import routerUnitCars from "../routes/unit-cars.router";
import routerRutas from "../routes/rutas.router";

import routerProducts from "../routes/products.router";
import routerLogin from "../routes/login.router";
import session from "express-session";


dotenv.config();
connection();

const PORT = process.env.PORT;
const app: Express = express();
const server = http.createServer(app);
const secretKeySession = process.env.SECRET_KET
// const io = new Server(server);

// & middlewares here
app.use(express.json());
app.use(cors());
// app.use(morgan("dev"));

declare module "express-session" {
  interface Session {
    user: any; 
  }
}

app.use(
  session({
    secret: "3903DJS_DJSDKSddew@-dsjk2983",
    resave: false,
    saveUninitialized: true,
  })
);

// & endpoints here
app.use(routerHome);
app.use(routerEmployees);
app.use(routerUnitCars);
app.use(routerRutas);
app.use(routerProducts);
app.use(routerLogin)

// todo: run server!
const bootstrap = () => {
  try {
    server.listen(PORT);
  } catch (error) {
    console.error(error);
  }
};

bootstrap();