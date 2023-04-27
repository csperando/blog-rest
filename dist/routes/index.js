"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const ping_1 = __importDefault(require("./ping"));
const blog_1 = __importDefault(require("./blog"));
exports.default = (server) => {
    server.use(body_parser_1.default.json());
    server.use("/", ping_1.default);
    server.use("/blog", blog_1.default);
};
