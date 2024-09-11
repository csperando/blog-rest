import express, { Request, Response, NextFunction } from "express";
import cors, { CorsOptions } from "cors";
import { iApiResponse } from "./models/apiResponse";
import router from "./routes";
import { setupLogs } from "./logging";
import * as winston from "winston";

const app = express();

setupLogs();

// CORS
const whitelist: string[] = ["http://localhost:5173"];
const setCorsOptions = function (req: Request, callback: any) {
    let options = {} as CorsOptions;

    if (whitelist?.indexOf(req.header("Origin") || "") !== -1) {
        options.origin = req.header("Origin");
        options.allowedHeaders = "Content-Type,Authorization,x-auth-token";
    }

    callback(null, options);
};
app.use(cors(setCorsOptions));

router(app);

// final catch for server errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    winston.error(err.message);

    const errorRes: iApiResponse = {
        status: 500,
        errors: [],
        data: {},
        message: err.message || "server error"
    };

    res.status(500).json(errorRes);
});

export default app;
