import { Request, Response, NextFunction } from "express";
import { iApiResponse } from "../../models/apiResponse";

import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../../config";

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

/**
 * 
 * @param req - request object, used to compare token and body data
 * 
 * When submitting a new blog post/editing an existing post, 
 * make sure that the user auth token agrees with the user info submitted with the form.
 * This is to prevent users from submitting blog posts on behalf of someone else.
 * 
 */
const isValidUser = (req: Request) => {
    try {
        // get token from header
        const token = req.header("x-auth-token") || "error";
        if(token == "error") {
            return false;
        }

        // compare usernames
        const v = (jwt.verify(token, config.jwt_key) as JwtPayload);
        if (v._id != req.body.username) {
            return false;
        }

        return true;

    } catch(err: any) {
        winston.error(err.message);
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
    isValidUser,
    isValidObjectID,
}
