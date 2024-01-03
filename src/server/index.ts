import morgan from "morgan";
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
import routerLogin from "../routes/login.router";



dotenv.config();
connection();

const PORT = process.env.PORT;
const app: Express = express();
const server = http.createServer(app);
// const io = new Server(server);

// & middlewares here
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


// & endpoints here
app.use(routerHome);
app.use(routerEmployees);
app.use(routerUnitCars);
app.use(routerRutas);
app.use(routerLogin)

// io.on("connection", (socket) => {
//   console.log(`user connected ${socket.id}`);

//   // handle chat event
//   socket.on("chat message", (msg) => {
//     io.emit("chat message", msg);
//   });
// });

// // routes

// todo: run server!
const bootstrap = () => {
  try {
    server.listen(PORT);
    //console.log(`Server listening on http://localhost:${PORT}`.blue);
  } catch (error) {
    console.error(error);
  }
};

bootstrap();