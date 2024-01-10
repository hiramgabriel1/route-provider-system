"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSystem = void 0;
const employees_model_1 = __importDefault(require("../models/employees.model"));
const bcrypt_config_1 = require("../validators/bcrypt.config");
class LoginSystem {
    async loginUser(username, password) {
        try {
            const usuario = await employees_model_1.default.findOne({ where: { nombre: username } });
            if (!usuario) {
                console.log("Usuario no encontrado");
                return undefined;
            }
            const passwordValid = await (0, bcrypt_config_1.verifyPasswordSecurity)(password, usuario.password);
            passwordValid
                ? usuario
                : false; //Contraseña incorrecta
        }
        catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    }
    async registerUser(user, username, lastnames, password, rol) {
        try {
            const usuario = await employees_model_1.default.findOne({ where: { nombre: username } });
            if (usuario) {
                console.log("Ya existe el usuario");
                return false;
            }
            const passwordHash = await (0, bcrypt_config_1.encryptPasswordSecurity)(password);
            const usercreated = await employees_model_1.default.create({
                user: user,
                username: username,
                lastnames: lastnames,
                password: passwordHash,
                rol: rol,
            });
            return usercreated;
        }
        catch (error) {
            console.error("Error al registrar usuario:", error);
        }
    }
}
exports.LoginSystem = LoginSystem;
exports.default = LoginSystem;
