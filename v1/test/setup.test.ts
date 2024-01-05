import server from "./server";
import { setupDatabase } from "../config";

afterAll(async () => {
    await server.close();
});

describe("Basic server setup", () => {
    it("should pass", () => {
        expect(1).toBe(1);
    });

    it("Should connect to the test database", async () => {
        const db = await setupDatabase();

        // should have a 'connections' array
        expect(db).toHaveProperty("connections");

        // the _readyState of the connections should be '1'
        expect(db.connections[0].readyState).toBe(1);

        // should connect to the test database
        expect(db.connections[0].name).toContain("test");
    });
});
