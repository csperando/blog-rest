const express = require("express");

const router = express.Router();

router.all("*", async function (req, res, next) {
	// TODO validation middleware for all requests
	next();
});

router.get("/newBlogPost", async (req, res, next) => {
	res.status(403);
	res.json({
		status: 403,
		message: "[GET] request not supported for this endpoint.",
	});
	res.send();
});

router.post("/newBlogPost", async (req, res, next) => {
	res.json({
		status: 200,
		message: "Hello!",
	});
	res.send();
});

module.exports = router;
