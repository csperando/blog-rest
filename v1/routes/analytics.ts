import { Router, NextFunction, Request, Response } from "express";
import { config } from "../config";
import * as _ from "lodash";

import { iApiResponse } from "../models/apiResponse";
import { iVisit } from "../models/Analytics";
import { AnalyticsSingleton } from "../services/AnalyticsService";

const router = Router();

let analyticsService: AnalyticsSingleton

router.all("*", [], async (req: Request, res: Response, next: NextFunction) => {
    analyticsService = await AnalyticsSingleton.getInstance(config);
    next();
});

/**
 * TODO - move to login Insert new user
 */
router.post("/logVisitor", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: iVisit = _.pick(req.body, ["token", "visits", "userAgent", "window", "ip"]);
        data.ip = req.ip;

        await analyticsService.logVisitor(data);

        const analyticsResponse: iApiResponse = {
            status: 200,
            data: "Thank you for helping improve my software!",
            errors: []
        };

        res.status(200).json(analyticsResponse);

    } catch(err) {
        next(err);
    }
});

export default router;
