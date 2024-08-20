import server from "../server";
import { setupDatabase } from "../../config";
import request from "supertest";
import { iApiResponse } from "../../models/apiResponse";
import { iUser, User } from "../../models/User";

let testID: string;
let testUser: iUser = {
    username: "Robert Paulson",
    salt: "",
    password: "",
    firstName: "Robert",
    lastName: "Paulson",
};

beforeAll(async () => {
    await setupDatabase();
});

afterAll(async () => {
    await User.collection.drop();
    await server.close();
});

describe("Basic read and write functions", () => {
    // it("Should get all users", async () => {
    //     const res = await request(server).get("/user");
    //     const body: iApiResponse = JSON.parse(res.text);
    //     const data = (body.data) as [iUser];
    //     expect(body.status).toBe(200);
    // });
    
    it("Should create a new user", async () => {
        const req = testUser;
        const res = await request(server).post("/user/new").send(req);
        const body: iApiResponse = JSON.parse(res.text);
        const data = (body.data) as iUser;
        
        // Should return 200
        expect(body.status).toBe(200);

        // response should contain the test user object
        expect(data).toMatchObject(testUser);

        // save id for later tests
        testID = body.data._id;
    });

    it("Should get user by id", async () => {
        const res = await request(server).get("/user/" + testID);
        const body: iApiResponse = JSON.parse(res.text);
        const data = (body.data) as iUser;

        // Should return 200
        expect(body.status).toBe(200);

        // response should contain the test user object
        expect(data).toMatchObject(testUser);
    });

    it("Should edit a user", async () => {
        let req = testUser;
        req.firstName = "Test";

        const res = await request(server).put("/user/edit/" + testID).send(req);
        const body: iApiResponse = JSON.parse(res.text);
        const data = (body.data) as iUser;

        // Should return 200
        expect(body.status).toBe(200);

        // Should return the same data sent for update
        expect(data.firstName).toBe(req.firstName);
    });

    it("Should delete a user", async () => {
        const res = await request(server).delete("/user/delete/" + testID);
        const body: iApiResponse = JSON.parse(res.text);
        const data = (body.data) as iUser;

        // Should return 200
        expect(body.status).toBe(200);

        // Should return the deleted user object on delete
        expect(data.username).toBe(testUser.username);
    });
});
