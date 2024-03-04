"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const home_controller_1 = __importDefault(require("../controllers/home.controller"));
const home = new home_controller_1.default();
const path = "/api/v1";
const routerHome = (0, express_1.Router)();
routerHome.get(`${path}/home`, (req, res) => {
    home.getDataParams(req, res);
});
exports.default = routerHome;
