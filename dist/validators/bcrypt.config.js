"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPasswordSecurity = exports.encryptPasswordSecurity = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const encryptPasswordSecurity = async (password) => {
    try {
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        return hashPassword;
    }
    catch (error) {
        console.error(error);
    }
};
exports.encryptPasswordSecurity = encryptPasswordSecurity;
const verifyPasswordSecurity = async (password, hashPassword) => {
    try {
        const verify = await bcrypt_1.default.compare(password, hashPassword);
        return verify;
    }
    catch (error) {
        console.error(error);
        console.log("Error al comparar contraseñas" + error);
    }
};
exports.verifyPasswordSecurity = verifyPasswordSecurity;
