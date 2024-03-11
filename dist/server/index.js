"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const _mongo_connection_1 = __importDefault(require("../db/[mongo]connection"));
const db_1 = require("../services/employees/db/db");
const http_1 = __importDefault(require("http"));
const home_router_1 = __importDefault(require("../routes/home.router"));
const employees_router_1 = __importDefault(require("../routes/employees.router"));
const unit_cars_router_1 = __importDefault(require("../routes/unit-cars.router"));
const rutas_router_1 = __importDefault(require("../routes/rutas.router"));
const products_router_1 = __importDefault(require("../routes/products.router"));
const session_router_1 = __importDefault(require("../routes/session.router"));
const system_broker_router_1 = __importDefault(require("../routes/system.broker.router"));
const products_routes_1 = __importDefault(require("../services/employees/routes/products.routes"));
const express_session_1 = __importDefault(require("express-session"));
const morgan_1 = __importDefault(require("morgan"));
const home_data_router_1 = __importDefault(require("../routes/home-data.router"));
dotenv_1.default.config();
(0, _mongo_connection_1.default)();
(0, db_1.employeesDatabaseConnection)();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// & middlewares here
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, express_session_1.default)({
    secret: "3903DJS_DJSDKSddew@-dsjk2983",
    resave: false,
    saveUninitialized: true,
    // role: false
}));
// devolver un role en la sessión tambien ademas de la secret
// & endpoints administrador here
app.use(home_router_1.default);
app.use(employees_router_1.default);
app.use(unit_cars_router_1.default);
app.use(rutas_router_1.default);
app.use(products_router_1.default);
app.use(session_router_1.default);
app.use(system_broker_router_1.default);
app.use(home_data_router_1.default);
// & endpoints employees here
app.use(products_routes_1.default);
// todo: run server!
const bootstrap = () => {
    try {
        server.listen(PORT);
    }
    catch (error) {
        console.error(error);
    }
};
bootstrap();
