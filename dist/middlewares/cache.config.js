"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_expeditious_1 = __importDefault(require("express-expeditious"));
const defaultOptions = {
    namespace: "expresscache", // todo: el nombre o la key donde guardaremos en memoria
    defaultTtl: "20 days",
    statusCodeExpires: {
        404: "5 minutes",
        500: 0,
    },
};
const cacheInit = (0, express_expeditious_1.default)(defaultOptions);
exports.default = cacheInit;
