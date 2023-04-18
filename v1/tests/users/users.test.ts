// import request from "supertest";
// import server from "../../server";
// import mongoose from "mongoose";
// import { iUser, User } from "../../models/user";

describe("nothing", () => {
    it("placeholder", () => {
        expect(1).toBe(1);
    });
});

// // User test suite vars
// let global_id: string = "";

// afterAll(async () => {
//     try {
//         await server.close();
//         await User.collection.drop();
//         await mongoose.connection.close();
//     } catch (err) {
//         // console.log(err);
//     }
// });

// describe("Basic user functions", () => {
//     it("signup a new user", async () => {
//         const req = {
//             username: "test_account",
//             password: "Password1!",
//         };

//         const res = await request(server).post("/v1/users/signup").send(req);
//         expect(res.status).toBe(200);

//         const data: iUser = JSON.parse(res.text).data;
//         expect(data.username).toBe(req.username);

//         global_id = data._id;
//     });

//     it("should login an existing user", async () => {
//         const req = {
//             username: "test_account",
//             password: "Password1!",
//         };

//         const res = await request(server).post("/v1/users/login").send(req);
//         expect(res.status).toBe(200);

//         const data: iUser = JSON.parse(res.text).data;
//         expect(data.username).toBe(req.username);
//     });
// });

// describe("Bad user requests", () => {
//     it("Should fail to signup without password", async () => {
//         const req = {
//             username: "error",
//         };

//         const res = await request(server).post("/v1/users/signup").send(req);
//         expect(res.status).toBe(400);

//         const data = JSON.parse(res.text).data;
//         const msg = data?.message.toLowerCase();
//         expect(msg).toContain("bad request");
//     });

//     it("Should fail to signup an existing user", async () => {
//         const req = {
//             username: "test_account",
//             password: "duplicate",
//         };

//         const res = await request(server).post("/v1/users/signup").send(req);
//         expect(res.status).toBe(400);

//         const data = JSON.parse(res.text).data;
//         const msg = data?.message.toLowerCase();
//         expect(msg).toContain("already exists");
//     });

//     it("Should fail to login a non-existing user", async () => {
//         const req = {
//             username: "test_account_dne",
//             password: "doesNotExist123!",
//         };

//         const res = await request(server).post("/v1/users/login").send(req);
//         expect(res.status).toBe(400);
//     });

//     it("Should fail to login with wrong password", async () => {
//         const req = {
//             username: "test_account",
//             password: "incorrectPassword123!",
//         };

//         const res = await request(server).post("/v1/users/login").send(req);
//         expect(res.status).toBe(400);
//     });

// });

// describe("Edit User", () => {
//     it("Should update the user's alias", async () => {
//         const req = {
//             alias: "newAlias"
//         };

//         const res = await request(server).put("/v1/users/edit/" + global_id).send(req);
//         expect(res.status).toBe(200);

//         const data: iUser = JSON.parse(res.text).data;
//         expect(data.alias).toBe(req.alias);
//     });

//     it("Should fail to update a user with invalid id", async () => {
//         const req = { alias: "newAlias" };
//         const badId = new mongoose.Types.ObjectId;

//         const res = await request(server).put("/v1/users/edit/" + badId).send(req);
//         expect(res.status).toBe(400);
//     });
// });
