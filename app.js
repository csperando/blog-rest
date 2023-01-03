const express = require("express");
const app = express();

app.use("/", (req, res, next) => {
	// console.log(req.method + " - " + req.path);
	res.status(200);
	next();
});

const newPostRouter = require("./routes/newPostRoute");
app.use("/v1/", newPostRouter);

app.use("/ping", (req, res, next) => {
	res.status(200);
	res.json({
		status: 200,
		message: "Hello!",
	});
	res.send();
});

module.exports = app;
