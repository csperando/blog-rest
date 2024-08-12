import express, { Request, Response, NextFunction } from "express";
import cors, { CorsOptions } from "cors";
import { iApiResponse } from "./models/apiResponse";
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

import router from "./routes";
router(app);

// final catch for server errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    const errorRes: iApiResponse = {
        status: 500,
        errors: [],
        data: {},
        message: err.message || "server error"
    };

    res.status(500).json(errorRes);
});

export default app;
