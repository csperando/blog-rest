"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const gh_1 = require("../services/gh");
const router = express_1.default.Router();
router.all("*", (req, res, next) => {
    next();
});
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dirPath = (0, fs_1.existsSync)("./blog/") ? "./blog/" : "./dist/blog";
        const files = yield (0, promises_1.readdir)(dirPath);
        // only return markdown files
        const markdown = files.filter((f) => {
            // return f.indexOf(".md") != -1;
            return true;
        });
        const blogResponse = {
            status: 200,
            errors: [],
            data: markdown,
        };
        res.status(blogResponse.status);
        res.json(blogResponse);
    }
    catch (err) {
        console.log(err);
        const errorResponse = {
            status: 500,
            errors: [err],
            data: {
                message: err.message,
            },
        };
        res.status(errorResponse.status);
        res.json(errorResponse);
    }
    finally {
        res.send();
    }
}));
router.get("/:blogTitle", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // define relevant path/files
        const dirPath = (0, fs_1.existsSync)("./blog/") ? "./blog/" : "./dist/blog/";
        const filePath = dirPath + req.params.blogTitle + ".md";
        const htmlPath = dirPath + "rendered/" + req.params.blogTitle + ".html";
        // try to get blog markdown
        const file = (yield (0, promises_1.readFile)(filePath)).toString();
        // write html file if it does not already exist
        if (file) {
            const exists = (0, fs_1.existsSync)(htmlPath);
            if (!exists) {
                const html = yield (0, gh_1.renderMarkdown)(file);
                yield (0, promises_1.writeFile)(htmlPath, html);
            }
        }
        // read blog data and construct responses
        let blogResponse;
        if (file) {
            const html = (yield (0, promises_1.readFile)(htmlPath)).toString();
            blogResponse = {
                status: 200,
                errors: [],
                data: { markdown: file, html: html },
            };
        }
        else {
            blogResponse = {
                status: 404,
                errors: [new Error("Could not find blog post.")],
                data: { message: "Could not find blog post." },
            };
        }
        res.status(blogResponse.status);
        res.json(blogResponse);
    }
    catch (err) {
        const errorResponse = {
            status: 500,
            errors: [err],
            data: {
                message: err.message,
            },
        };
        res.status(errorResponse.status);
        res.json(errorResponse);
    }
    finally {
        res.send();
    }
}));
exports.default = router;
