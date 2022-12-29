const express = require("express");
const PORT = process.env.PORT || 3100;
const app = express();

app.use("/", (req, res) => {
	console.log(req.method + " - " + req.path);

	res.json({
		status: 200,
		message: "Welcome to my application!",
	});

	res.send();
});

const server = app.listen(PORT, () => {
	console.log("Server up on port: " + PORT);
});

module.exports = server;
