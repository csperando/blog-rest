import app from "./app";

import { config, setupDatabase } from "./config";

setupDatabase();

const port = config.rest_port || 8080;
const server = app.listen(port, () => {
    console.log(`REST server up on port [${port}]`);
});

export default server;
