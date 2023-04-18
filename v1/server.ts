import { config } from "./envConfig";
const port = (config.env == "test") ? config.rest_port_test : config.rest_port;

// setup app
import app from "./app";
const server = app.listen(port, () => {
    console.log("REST server up on port " + port);
});

export default server;
