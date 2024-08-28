import { Router, NextFunction, Request, Response } from "express";
import { genSalt, hash } from "bcrypt";
import * as _ from "lodash";

import { iApiResponse } from "../models/apiResponse";
import { UserSingleton } from "../services/userService";
import { AuthSingleton } from "../services/AuthService";

import auth from "../middleware/auth";
import { iUser } from "v1/models/User";
// import { vUser } from "../middleware/validators/user";


const router = Router();

let userService: UserSingleton
let authService: AuthSingleton

router.all("*", [auth], async (req: Request, res: Response, next: NextFunction) => {
    userService = await UserSingleton.getInstance();
    authService = await AuthSingleton.getInstance();
    next();
});

/**
 * TODO - move to login Insert new user
 */
router.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUserData = req.body;
        const newUserResponse: iApiResponse = {
            status: 200,
            data: "",
            errors: []
        };
        
        // validations (no dupe usernames, etc.)
        const found: [iUser] = await userService.getUserByUsername(newUserData.username);
        if(found.length) {
            newUserResponse.status = 400;
            newUserResponse.data = "Username already exists";
            res.status(400).json(newUserResponse).send();
            return;
        }
        
        // generate salt and hash password
        newUserData.salt = await genSalt(10);
        newUserData.password = await hash(newUserData.password, newUserData.salt);
        
        // insert new data into DB
        const u = await userService.insertNewUser(newUserData);
        if(!u) {
            throw(new Error("Failed to create new user."));
        }
        
        // generate jwt here
        const jwt = await authService.generateJWT(newUserData.username);
        // TODO - set header 'x-auth-token'

        // return new user object (filter out pw, etc.)
        // TODO - send auth token with response
        newUserResponse.data = _.pick(u, ["username", "firstName", "lastName", "email", "_id"]);
        res.status(200).json(newUserResponse).send();

    } catch(err) {
        next(err);
    }
});


export default router;
