const app = require("./app");

let PORT = process.env.PORT || 3100;
if (process.env?.NODE_ENV == "test") {
	PORT = 3200;
}

const server = app.listen(PORT, () => {
	// console.log("Server up on port: " + PORT);
});

module.exports = server;
