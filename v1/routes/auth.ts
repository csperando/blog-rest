import express, { NextFunction, Request, Response } from "express";
import auth from "../middleware/auth";
import { apiResponse } from "../models/apiResponse";

const router = express.Router();

router.all("*", [auth], async (req: Request, res: Response, next: NextFunction) => {
    next();
});

/**
 * 
 */
router.post("/", async (req: Request, res: Response) => {
    let r: apiResponse = {
        status: 200,
        errors: [],
        data: {},
    };

    try {
        r.data.message = "authenticated";
        
    } catch (err) {
        console.log(err);
        
        r.status = 400;
        r.errors.push(err as Error);
        
    } finally {
        res.json(r);
        res.send();

    }
})

export default router;
