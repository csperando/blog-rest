import express, { NextFunction, Request, Response } from "express";
import { existsSync } from "fs";
import { readdir, readFile } from "fs/promises";

import { apiResponse } from "v1/models/apiResponse";

const router = express.Router();

router.all("*", (req: Request, res: Response, next: NextFunction) => {
    next();
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const dirPath = existsSync("./blog/") ? "./blog/" : "./dist/blog/";
        const files = await readdir(dirPath);
        let posts: any = [];

        for (const f of files) {
            const filePath = dirPath + f;
            const data = await readFile(filePath, "utf-8");
            posts.push(data);
        }

        const blogResponse: apiResponse = {
            status: 200,
            errors: [],
            data: posts,
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
