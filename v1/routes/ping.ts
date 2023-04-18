import express, { Request, Response } from "express";
// import { apiResponse } from "../models/apiResponse";

const router = express.Router();

router.all("/", async (req: Request, res: Response) => {
    res.status(200);
    res.send("Hello!");
});

export default router;
