import { Router, NextFunction, Request, Response } from "express";
import { compare, genSalt, hash } from "bcrypt";
import * as _ from "lodash";

import { iApiResponse } from "../models/apiResponse";
import { UserSingleton } from "../services/userService";
import { AuthSingleton } from "../services/AuthService";

import { iUser } from "../models/User";
import { JwtPayload } from "jsonwebtoken";
import { config } from "../config";

// import auth from "../middleware/auth";
// import { vUser } from "../middleware/validators/user";


const router = Router();

let userService: UserSingleton
let authService: AuthSingleton

router.all("*", [], async (req: Request, res: Response, next: NextFunction) => {
    userService = await UserSingleton.getInstance(config);
    authService = await AuthSingleton.getInstance(config);
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
            res.status(400).json(newUserResponse);
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
        
        // generate jwt and set header
        const jwt = await authService.generateJWT(newUserData.username);
        res.set("x-auth-token", jwt);
        
        // return new user object (filter out pw, etc.)
        newUserResponse.data = _.pick(u, ["username", "firstName", "lastName", "email", "_id"]);
        newUserResponse.data.token = jwt;
        res.status(200).json(newUserResponse);

    } catch(err) {
        next(err);
    }
});

/**
 * TODO - move to login Insert new user
 */
router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData = req.body;
        const loginResponse: iApiResponse = {
            status: 200,
            data: "",
            errors: []
        };
        
        // validate user exists
        const found: [iUser] = await userService.getUserByUsername(userData.username);
        if(!found.length) {
            loginResponse.status = 400;
            loginResponse.data = "Username or password is incorrect.";
            res.status(400).json(loginResponse);
            return;
        }
        
        // compare passwords
        const valid = await compare(userData.password, found[0].password);
        if(!valid) {
            loginResponse.status = 400;
            loginResponse.data = "Username or password is incorrect.";
            res.status(400).json(loginResponse);
            return;
        }
        
        // generate jwt and set header
        const jwt = await authService.generateJWT(userData.username);
        res.set("x-auth-token", jwt);
        
        // return new user object (filter out pw, etc.)
        loginResponse.data = _.pick(found[0], ["username", "firstName", "lastName", "email", "_id"]);
        loginResponse.data.token = jwt;
        res.status(200).json(loginResponse);

    } catch(err) {
        next(err);
    }
});

/**
 * TODO - move to login Insert new user
 */
router.post("/token", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authResponse: iApiResponse = {
            status: 200,
            data: "",
            errors: []
        };

        const token = req.header("x-auth-token");
        
        // validate token
        const valid = (await authService.validateJWT(token) as JwtPayload);
        if(!valid) {
            authResponse.status = 400;
            authResponse.data = "Invalid token.";
            res.status(400).json(authResponse);
            return;
        }

        const username = valid._id;
        const u = await userService.getUserByUsername(username);
        if(!u.length) {
            authResponse.status = 400;
            authResponse.data = "Invalid token.";
            res.status(400).json(authResponse);
            return;
        }

        res.set("x-auth-token", token);
        authResponse.data = _.pick(u[0], ["username", "firstName", "lastName", "email", "_id"]);
        res.status(200).json(authResponse);

    } catch(err) {
        next(err);
    }
});

export default router;
