import { config, setupDatabase } from "./config";
setupDatabase();

import app from "./app";

const port = config.rest_port || 8080;
const server = app.listen(port, () => {
    console.log(`REST server up on port [${port}]`);
});

export default server;
