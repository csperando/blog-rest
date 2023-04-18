const app = require("../v1/app");
const serverless = require("serverless-http");
module.exports.handler = serverless(app);
