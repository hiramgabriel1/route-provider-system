// import morgan from "morgan";
import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connection from "../db/[mongo]connection";
import { employeesDatabaseConnection } from "../services/employees/db/db";
import http from "http";
import routerHome from "../routes/home.router";
import routerEmployees from "../routes/employees.router";
import routerUnitCars from "../routes/unit-cars.router";
import routerRutas from "../routes/rutas.router";
import routerProducts from "../routes/products.router";
import routerSession from "../routes/session.router";
import routerBrokerCourt from "../routes/system.broker.router";
import routerMarkProducts from "../services/employees/routes/products.routes";
import session from "express-session";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import specs from "../doc/swagger";

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

app.use(
  session({
    secret: "3903DJS_DJSDKSddew@-dsjk2983",
    resave: false,
    saveUninitialized: true,
  })
);

// & endpoints administrador here
app.use(routerHome);
app.use(routerEmployees);
app.use(routerUnitCars);
app.use(routerRutas);
app.use(routerProducts);
app.use(routerSession);
app.use(routerBrokerCourt);

// & endpoints employees here
app.use(routerMarkProducts);

// & endpoint to documentation api here
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// app.use("api-docs", SwaggerUiOptions, swaggerUi.setup(specs));

// todo: run server!
const bootstrap = () => {
  try {
    server.listen(PORT);
  } catch (error) {
    console.error(error);
  }
};

bootstrap();
