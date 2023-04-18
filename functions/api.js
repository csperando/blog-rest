const app = require("../dist/app");
const serverless = require("serverless-http");
module.exports.handler = serverless(app);
