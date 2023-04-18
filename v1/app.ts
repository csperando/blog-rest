import express, { Request, Response } from "express";
import cors, { CorsOptions } from "cors";

const app = express();

// CORS
const whitelist: string[] = [];
const setCorsOptions = function (req: Request, callback: any) {
    let options = {} as CorsOptions;

    if (whitelist?.indexOf(req.header("Origin") || 'localhost') !== -1) {
        options.origin = req.header("Origin");
    }

    callback(null, options);
};
app.use(cors(setCorsOptions));

// router
import router from "./routes";
router(app);

export default app;
