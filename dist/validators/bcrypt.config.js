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
async function verifyPasswordSecurity(plainPassword, hashedPassword) {
    try {
        const match = await bcrypt_1.default.compare(plainPassword, hashedPassword);
        return match;
    }
    catch (error) {
        console.error("Error al comparar contraseñas:", error);
        throw error;
    }
}
exports.verifyPasswordSecurity = verifyPasswordSecurity;
