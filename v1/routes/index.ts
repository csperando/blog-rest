import { Express } from "express";
import bodyParser from "body-parser";
// const version = process.env.rest_version || "v1";

import ping from "./ping";
// import authRouter from "./auth";
// import userRouter from "./user";


export default (server: Express) => {
    server.use(bodyParser.json());
    server.use("/", ping);
    // server.use("/" + version + "/auth", authRouter);
    // server.use("/" + version + "/users", userRouter);
}
