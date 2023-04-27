import express, { NextFunction, Request, Response } from "express";
import { existsSync } from "fs";
import { readdir, readFile, writeFile } from "fs/promises";

import { apiResponse } from "v1/models/apiResponse";
import { renderMarkdown } from "../services/gh";

const router = express.Router();

router.all("*", (req: Request, res: Response, next: NextFunction) => {
    next();
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const dirPath = existsSync("./blog/") ? "./blog/" : "./dist";
        const files = await readdir(dirPath);

        // only return markdown files
        const markdown = files.filter((f) => {
            // return f.indexOf(".md") != -1;
            return true;
        });

        const blogResponse: apiResponse = {
            status: 200,
            errors: [],
            data: markdown,
        }
        
        res.status(blogResponse.status);
        res.json(blogResponse);

    } catch (err: any) {
        console.log(err);

        const errorResponse: apiResponse = {
            status: 500,
            errors: [err],
            data: {
                message: err.message,
            },
        };

        res.status(errorResponse.status);
        res.json(errorResponse);
        
    } finally {
        res.send();
    }
});

router.get("/:blogTitle", async (req: Request, res: Response) => {
    try {
        // define relevant path/files
        const dirPath = existsSync("./blog/") ? "./blog/" : "./dist/blog/";
        const filePath = dirPath + req.params.blogTitle + ".md";
        const htmlPath = dirPath + "rendered/" + req.params.blogTitle + ".html";
        
        // try to get blog markdown
        const file = (await readFile(filePath)).toString();

        // write html file if it does not already exist
        if (file) {
            const exists = existsSync(htmlPath);
            if (!exists) {
                const html = await renderMarkdown(file);
                await writeFile(htmlPath, (html as string));
            }
        }
        
        // read blog data and construct responses
        let blogResponse: apiResponse;
        if (file) {
            const html = (await readFile(htmlPath)).toString();
            blogResponse = {
                status: 200,
                errors: [],
                data: { markdown: file, html: html },
            }
        } else {
            blogResponse = {
                status: 404,
                errors: [new Error("Could not find blog post.")],
                data: { message: "Could not find blog post." },
            }
        }
        
        res.status(blogResponse.status);
        res.json(blogResponse);

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
        
    } finally {
        res.send();
        
    }
});

export default router;
