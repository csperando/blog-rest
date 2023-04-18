import request from "supertest";
import server from "../server";

afterAll(async () => {
    try {
        await server.close();
    } catch (err) {
        // console.log(err);
    }
});

describe("Basic Testing Setup", () => {
    it("Should pass", () => {
        expect(1).toBe(1);
    });

    it("Should ping the server", async () => {
        const res = await request(server).get("/");
        expect(res.status).toBe(200);
        expect(res.text).toBe("Hello!");
    });
});
