import { Router, NextFunction, Request, Response } from "express";
import { genSalt, hash } from "bcrypt";
import * as _ from "lodash";

import { iApiResponse } from "../models/apiResponse";
import { UserSingleton } from "../services/userService";
import { BlogSingleton } from "../services/blogService";

import auth from "../middleware/auth";
import { iUser } from "../models/User";
import { config } from "../config";

// import { vUser } from "../middleware/validators/user";


const router = Router();

let userService: UserSingleton
let blogService: BlogSingleton;

router.all("*", async (req: Request, res: Response, next: NextFunction) => {
    userService = await UserSingleton.getInstance(config);
    blogService = await BlogSingleton.getInstance(config);
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
        
        res.status(userResponse.status).json(userResponse);

    } catch (err: any) {
        next(err);
    }

});

/**
 * Get a user by their id
 */
router.get("/posts/:userID", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userID = req.params.userID;
        const user = await userService.getUserByID(userID);

        if(!user) {
            throw(new Error("Could not find user."));
        }

        const author = user.firstName + " " + user.lastName;
        const posts = await blogService.getBlogPostsByAuthor(author);

        const userPostsResponse: iApiResponse = { 
            status: 200,
            errors: [],
            data: posts,
        }
        
        res.status(userPostsResponse.status).json(userPostsResponse);

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
            data: _.pick(user, ["email", "firstName", "lastName", "username", "phone", "_id"]),
        }
        
        res.status(userResponse.status).json(userResponse);

    } catch (err: any) {
        next(err);
    }

});


/**
 * TODO - move to login Insert new user
 */
router.post("/new", [auth], async (req: Request, res: Response, next: NextFunction) => {
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

        // return new user object (filter out pw, etc.)
        // TODO - send auth token with response
        newUserResponse.data = _.pick(u, ["username", "firstName", "lastName", "email", "_id"]);
        res.status(200).json(newUserResponse);

    } catch(err) {
        next(err);
    }
});

/**
 * Edit an existing user by id
 */
router.put("/edit/:userID", [auth], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const r: iApiResponse = { 
            status: 200,
            errors: [],
            data: {},
        };

        const userID = req.params.userID;
        let newUserData = req.body;
        
        // validate user exists
        let user = await userService.getUserByID(userID);
        if(!user) {
            throw(new Error("Could not find user."));
        }
        
        // filter supplied fields
        newUserData = _.pick(newUserData, ["firstName", "lastName", "email", "phone"]);
        user = await userService.editUserByID(userID, newUserData);
        r.data = user;

        res.status(200).json(r);

    } catch(err) {
        next(err);
    }
});

/**
 * Delete an existing user by id
 */
router.delete("/delete/:userID", [auth], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const r: iApiResponse = { 
            status: 200,
            errors: [],
            data: {},
        };
        
        const userID = req.params.userID;

        // validate user exists
        let user = await userService.getUserByID(userID);
        if(!user) {
            throw(new Error("Could not find user."));
        }

        const deletedUserData = await userService.deleteUserByID(userID);
        r.data = _.pick(deletedUserData, ["username", "firstName", "lastName", "email", "phone"]);

        res.status(200).json(r);

    } catch(err) {
        next(err);
    }
});

export default router;
