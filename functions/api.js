const serverless = require("serverless-http");

// const express = require("express");
// const app = express();
// app.use("/", (req, res) => {
// 	res.status(200);
// 	res.send("Hello!");
// });

const app = require("../dist/app");

module.exports.handler = serverless(app);
