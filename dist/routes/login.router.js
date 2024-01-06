"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controller_1 = __importDefault(require("../controllers/login.controller"));
const controllerLogin = new login_controller_1.default();
const routerLogin = (0, express_1.Router)();
const path = "/api/v1";
routerLogin.post(`${path}/login`, async (req, res) => {
    await controllerLogin.loginUser(req, res);
});
routerLogin.post(`${path}/register`, async (req, res) => {
    await controllerLogin.registerUser(req, res);
});
routerLogin.post(`${path}/logout`, async (req, res) => {
    await controllerLogin.logout(req, res);
});
exports.default = routerLogin;
