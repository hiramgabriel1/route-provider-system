"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const map_controller_1 = __importDefault(require("../controllers/map.controller"));
const mapController = new map_controller_1.default();
const rotuerMap = (0, express_1.Router)();
const path = "/api/v1";
rotuerMap.get(`${path}/map/:routeID`, (req, res) => {
    mapController.showMap(req, res);
});
