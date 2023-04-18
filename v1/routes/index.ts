import { Express } from "express";
import bodyParser from "body-parser";

import ping from "./ping";
import blogRouter from "./blog";

export default (server: Express) => {
    server.use(bodyParser.json());
    server.use("/", ping);
    server.use("/blog", blogRouter);
}
