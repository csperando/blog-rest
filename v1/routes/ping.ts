import express, { Request, Response } from "express";

const router = express.Router();

router.all("/", async (req: Request, res: Response) => {
    res.status(200);
    res.send("Hello!");
});

export default router;
