import app from "./app";
import { config, setupDatabase } from "./config";

setupDatabase()

const server = app.listen(config.rest_port, () => {
    console.log("server up on 3000");
});

export default server;
