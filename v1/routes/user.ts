import { Router, NextFunction, Request, Response } from "express";

import { iApiResponse } from "../models/apiResponse";
import { UserSingleton } from "../services/userService";

import auth from "../middleware/auth";
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

export default router;
