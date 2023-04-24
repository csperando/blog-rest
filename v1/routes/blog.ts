import express, { NextFunction, Request, Response } from "express";
import { existsSync } from "fs";
import { readdir, readFile } from "fs/promises";

import { apiResponse } from "v1/models/apiResponse";
import { renderMarkdown } from "../services/gh";

const router = express.Router();

router.all("*", (req: Request, res: Response, next: NextFunction) => {
    next();
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const dirPath = existsSync("./blog/") ? "./blog/" : "./dist/blog/";
        const files = await readdir(dirPath);

        const blogResponse: apiResponse = {
            status: 200,
            errors: [],
            data: files,
        }
        
        res.status(blogResponse.status);
        res.json(blogResponse);
        res.send();

    } catch (err: any) {
        const errorResponse: apiResponse = {
            status: 500,
            errors: [err],
            data: {
                message: err.message,
            },
        };

        res.status(errorResponse.status);
        res.json(errorResponse);
        res.send();
        
    }
});

router.get("/:blogTitle", async (req: Request, res: Response) => {
    try {
        
        const dirPath = existsSync("./blog/") ? "./blog/" : "./dist/blog/";
        const filePath = dirPath + req.params.blogTitle + ".md";
        const file = (await readFile(filePath)).toString();

        
        let blogResponse: apiResponse;
        if (file) {
            const html = await renderMarkdown(file);

            blogResponse = {
                status: 200,
                errors: [],
                data: {
                    markdown: file,
                    html: html
                },
            }
        } else {
            blogResponse = {
                status: 404,
                errors: [new Error("Could not find blog post.")],
                data: {
                    message: "Could not find blog post."
                },
            }
        }
        
        res.status(blogResponse.status);
        res.json(blogResponse);
        res.send();

    } catch (err: any) {
        const errorResponse: apiResponse = {
            status: 500,
            errors: [err],
            data: {
                message: err.message,
            },
        };

        res.status(errorResponse.status);
        res.json(errorResponse);
        res.send();
        
    }
});

export default router;
