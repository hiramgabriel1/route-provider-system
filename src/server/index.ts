import express, { Express } from "express";
import { employeesDatabaseConnection } from "../services/employees/db/db";
import connection from "../db/[mongo]connection";
import routerHomeData from "../routes/home-data.router";
import routerRequestProducts from "../routes/requestProducts.router";
import routerHome from "../routes/home.router";
import routerEmployees from "../routes/employees.router";
import routerUnitCars from "../routes/unit-cars.router";
import routerRutas from "../routes/rutas.router";
import routerProducts from "../routes/products.router";
import routerSession from "../routes/session.router";
import routerBrokerCourt from "../routes/system.broker.router";
import routerTienda from "../routes/tienda.router";
import routerMarkProducts from "../services/employees/routes/products.routes";
import creditStoreRouter from "../routes/creditStore.router";
import session from "express-session";
import http from "http";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
connection();
employeesDatabaseConnection();

const PORT = process.env.PORT;
const app: Express = express();
const server = http.createServer(app);

// & middlewares here
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

declare module "express-session" {
  interface Session {
    user: any;
  }
}

// app.use(
//   session({
//     // en caso de error quitar este env y ponerlo drectamente sin el process
//     secret: String(process.env.SECRET_KEY),
//     resave: false,
//     saveUninitialized: true,
//     // role: false
//   })
// );

// & endpoints administrador here
app.use(creditStoreRouter);

app.use(routerHome);
app.use(routerEmployees);
app.use(routerUnitCars);
app.use(routerRutas);
app.use(routerProducts);
app.use(routerSession);
app.use(routerBrokerCourt);
app.use(routerHomeData);
app.use(routerRequestProducts);
app.use(routerTienda);

// & endpoints employees here
app.use(routerMarkProducts);

// todo: run server!
const bootstrap = () => {
  try {
    console.log(PORT);
    server.listen(PORT);
  } catch (error) {
    console.error(error);
  }
};

bootstrap();
