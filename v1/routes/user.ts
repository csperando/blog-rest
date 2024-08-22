import { Router, NextFunction, Request, Response } from "express";
import { genSalt, hash } from "bcrypt";
import * as _ from "lodash";

import { iApiResponse } from "../models/apiResponse";
import { UserSingleton } from "../services/userService";

import auth from "../middleware/auth";
import { iUser } from "v1/models/User";
// import { vUser } from "../middleware/validators/user";


const router = Router();

let userService: UserSingleton

router.all("*", [auth], async (req: Request, res: Response, next: NextFunction) => {
    userService = await UserSingleton.getInstance();
    next();
});

/**
 * Get all users
 */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await userService.getAllUsers();

        const userResponse: iApiResponse = {
            status: 200,
            errors: [],
            data: posts,
        }
        
        res.status(userResponse.status).json(userResponse).send();

    } catch (err: any) {
        next(err);
    }

});

/**
 * Get a user by their id
 */
router.get("/:userID", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userID = req.params.userID;
        const user = await userService.getUserByID(userID);

        if(!user) {
            throw(new Error("Could not find user."));
        }

        const userResponse: iApiResponse = { 
            status: 200,
            errors: [],
            data: user,
        }
        
        res.status(userResponse.status).json(userResponse).send();

    } catch (err: any) {
        next(err);
    }

});


/**
 * Insert new user
 */
router.post("/new", async (req: Request, res: Response, next: NextFunction) => {
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

        // return new user object (filter out pw, etc.)
        // TODO - send auth token with response
        newUserResponse.data = _.pick(u, ["username", "firstName", "lastName", "email"]);
        res.status(200).json(newUserResponse).send();

    } catch(err) {
        next(err);
    }
});

export default router;
