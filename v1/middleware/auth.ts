import { Request, Response, NextFunction } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";

export default async function auth(req: Request, res: Response, next: NextFunction) {
    try {
        // get token from header
        const token = req.header("x-auth-token") || "error";
        if(token == "error") {
            throw(new Error("Token required."));
        }

        /*
            verify against .env value

            returns the following object:
                { 
                    _id: 'username', 
                    iat: 1725907136, 
                    exp: 1725993536 
                }
            
            or throws an error
        */
        const v = (jwt.verify(token, config.jwt_key) as JwtPayload);
        next();

    } catch(err: any) {
        next(err);
    }
}
