import app from "./app";

import { config, setupDatabase } from "./config";

setupDatabase();

const server = app.listen(config.rest_port, () => {
    console.log(`REST server up on port [${config.rest_port}]`);
});

export default server;
