import express, { NextFunction, Request, Response } from "express";
import { readdir, readFile } from "fs/promises";

import { apiResponse } from "v1/models/apiResponse";

const router = express.Router();

router.all("*", (req: Request, res: Response, next: NextFunction) => {
    next();
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const dirPath = "./v1/blog/";
        const files = await readdir(dirPath);
        let posts: any = [];

        for (const f of files) {
            const filePath = dirPath + f;
            const data = await readFile(filePath, "utf-8");
            posts.push(data);
        }

        let blogResponse: apiResponse = {
            status: 200,
            errors: [],
            data: posts,
        }
        
        res.status(blogResponse.status);
        res.json(blogResponse);
        res.send();

    } catch (err: any) {
        res.status(500);
        res.send(err.message);
        
    }
});

router.get("/:title", async (req: Request, res: Response) => {
    try {
        res.status(403);
        res.send("Not Available");

    } catch (err: any) {
        
    }
});

export default router;
