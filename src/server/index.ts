// src/server/index
import morgan from "morgan";
import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import { Server } from "socket.io";
import http from "http";

dotenv.config();

const PORT = process.env.PORT;
const app: Express = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  // handle chat event
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

// routes

// todo: run server!
const bootstrap = () => {
  try {
    server.listen(PORT);
    console.log(`Server listening on http://localhost:${3000}`.blue);
  } catch (error) {
    console.error(error);
  }
};

bootstrap();