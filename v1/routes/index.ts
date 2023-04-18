import { Express } from "express";
import bodyParser from "body-parser";

import ping from "./ping";

export default (server: Express) => {
    server.use(bodyParser.json());
    server.use("/", ping);
}
