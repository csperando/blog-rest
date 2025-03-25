import { Router, NextFunction, Request, Response } from "express";
import winston from "winston";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import { iApiResponse } from "../models/apiResponse";
import { SeriesSingleton } from "../services/seriesService";

import auth from "../middleware/auth";
import { vUser } from "../middleware/validators/user";
import { config } from "../config";

import { iSeries } from "v1/models/Series";
// import { iBlogPost } from "../models/Blog";

const router = Router();

let seriesService: SeriesSingleton;

router.all("*", [], async (req: Request, res: Response, next: NextFunction) => {
    seriesService = await SeriesSingleton.getInstance(config);
    next();
});


/**
 * Get all series
 */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        // TODO - update repo method to filter resulting columns
        const series: iSeries[] = await seriesService.getAllSeries();

        const seriesResponse: iApiResponse = {
            status: 200,
            errors: [],
            data: series,
        }
        
        res.status(seriesResponse.status).json(seriesResponse);

    } catch (err: any) {
        winston.error(err.message);
        next(err);
    }

});


/**
 * Create new series
 */
router.post("/", [auth], async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get file data from request body using Multer middleware
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const formData = req.body;

        // // TODO - review this validator. Requires username to be part of req body
        // const validUser = vUser.isValidUser(req);
        // if(!validUser) {
        //     throw(new Error("Cannot create post for the provided user."));
        // }

        const n = {
            title: formData?.title,
            description: formData?.description,
            keywords: formData?.keywords,
            thumbnail: formData?.thumbnail,
            posts: formData?.posts,
            mime: formData?.mime,
            latestPost: formData?.latestPost,
        } as iSeries;

        const newSeries = await seriesService.addNewSeries(n);

        const seriesResponse: iApiResponse = {
            status: 200,
            errors: [],
            data: n,
        }
        
        res.status(seriesResponse.status).json(seriesResponse);

    } catch (err: any) {
        winston.error(err.message);
        next(err);
    }

});


export default router;
