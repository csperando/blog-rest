"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// CORS
const whitelist = [];
const setCorsOptions = function (req, callback) {
    let options = {};
    if ((whitelist === null || whitelist === void 0 ? void 0 : whitelist.indexOf(req.header("Origin") || 'localhost')) !== -1) {
        options.origin = req.header("Origin");
    }
    callback(null, options);
};
app.use((0, cors_1.default)(setCorsOptions));
const routes_1 = __importDefault(require("./routes"));
(0, routes_1.default)(app);
exports.default = app;
