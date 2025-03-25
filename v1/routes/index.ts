import { Express } from "express";
import bodyParser from "body-parser";
// import { iConfig } from "../config";

import ping from "./ping";
import blogRouter from "./blog";
import seriesRouter from "./series";
import userRouter from "./user";
import authRouter from "./auth";

export default (server: Express) => {
    server.use(bodyParser.json());
    server.use("/", ping);
    server.use("/user", userRouter);
    server.use("/auth", authRouter);
    
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use("/blog", blogRouter);
    server.use("/series", seriesRouter);
}
