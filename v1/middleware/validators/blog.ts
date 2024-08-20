import { Request, Response, NextFunction } from "express";
import { iApiResponse } from "v1/models/apiResponse";

import { iBlogPost, BlogPost } from "../../models/Blog";
import { isValidObjectId } from "mongoose";
import winston from "winston";

const isValidObjectID = (req: Request, res: Response, next: NextFunction) => {
    try {
        const isValid = isValidObjectId(req.params.postID);

        if(isValid) {
            next();
        } else {
            const errorRes: iApiResponse = {
                status: 404,
                data: null,
                errors: [],
                message: "No matching blog posts found."
            }

            res.status(404).json(errorRes);
        }

    } catch(err: any) {
        winston.error(err.message);
        next(err);
    }
}

const hasValidHTML = async (req: Request, res: Response, next: NextFunction) => {
    try {
        next();

    } catch(err: any) {
        winston.error(err.message);
        next(err);
    }
}

export const vBlog = {
    hasValidHTML,
    isValidObjectID,
}
