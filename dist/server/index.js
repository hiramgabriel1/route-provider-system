"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const _mongo_connection_1 = __importDefault(require("../db/[mongo]connection"));
const http_1 = __importDefault(require("http"));
const home_router_1 = __importDefault(require("../routes/home.router"));
const employees_router_1 = __importDefault(require("../routes/employees.router"));
const unit_cars_router_1 = __importDefault(require("../routes/unit-cars.router"));
const rutas_router_1 = __importDefault(require("../routes/rutas.router"));
const products_router_1 = __importDefault(require("../routes/products.router"));
const login_router_1 = __importDefault(require("../routes/login.router"));
const express_session_1 = __importDefault(require("express-session"));
dotenv_1.default.config();
(0, _mongo_connection_1.default)();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// const io = new Server(server);
// & middlewares here
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, express_session_1.default)({
    secret: 'asdasdas',
    resave: false,
    saveUninitialized: true,
}));
// & endpoints here
app.use(home_router_1.default);
app.use(employees_router_1.default);
app.use(unit_cars_router_1.default);
app.use(rutas_router_1.default);
app.use(products_router_1.default);
app.use(login_router_1.default);
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
    }
    catch (error) {
        console.error(error);
    }
};
bootstrap();
