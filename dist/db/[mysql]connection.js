"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize({
    database: 'nombre_de_tu_base_de_datos',
    username: 'tu_usuario',
    password: 'tu_contraseña',
    host: 'localhost',
    dialect: 'mysql',
});
exports.default = db;
