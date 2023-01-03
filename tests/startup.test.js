const request = require("supertest");
let server;

beforeAll(async function () {
	try {
		server = await require("../server");
	} catch (err) {
		console.error(err);
	}
});

describe("server startup tests", function () {
	it("should return 200 after pinging the server", async function () {
		const res = await request(server).get("/ping");
		expect(res.status).toBe(200);
	});
});

afterAll(async function () {
	try {
		await server.close();
	} catch (err) {
		console.error(err);
	}
});
