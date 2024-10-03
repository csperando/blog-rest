import server from "../../server";
import { setupDatabase } from "../../../config";
import request from "supertest";
import { iApiResponse } from "../../../models/apiResponse";
import { BlogPost, iBlogPost } from "../../../models/Blog";

let testID: string;
let testPost: iBlogPost = {
    title: "Test Blog Post",
    author: "TS-Jest",
    keywords: [],
    markdown: "",
    description: "test",
    html: "",
    created: "",
    updated: "",
};

beforeAll(async () => {
    await setupDatabase();
});

afterAll(async () => {
    await BlogPost.collection.drop();
    await server.close();
});

describe("Basic read and write functions", () => {
    it("Should add a new blog post", async () => {
        const req = testPost;
        const res = await request(server).post("/blog/new").send(req);
        const body: iApiResponse = JSON.parse(res.text);
        const data = (body.data) as iBlogPost;
        
        // should be successful
        expect(body.status).toBe(200);
        
        // response should contain the blog post 
        expect(data).toMatchObject(testPost);
        
        // save id for later tests
        testID = body.data._id;
    });
    
    it("Should get all blog posts", async () => {
        const res = await request(server).get("/blog");
        const body: iApiResponse = JSON.parse(res.text);
        const data: iBlogPost[] = body.data;

        // request should be successfull
        expect(body.status).toBe(200);

        // expect(data)
    });

    it("Should get a blog post by ID", async () => {
        const res = await request(server).get("/blog/find/" + testID);
        const body: iApiResponse = JSON.parse(res.text);
        const data: iBlogPost = body.data;
        
        // request should be successfull
        expect(body.status).toBe(200);

        // it should return the correct information
        expect(data).toMatchObject(testPost);

    });

    it("should fail to get a post by the wrong id", async () => {
        const res = await request(server).get("/blog/find/1234");
        const body: iApiResponse = JSON.parse(res.text);
        
        // no posts should be found
        expect(body.status).not.toBe(200);
    });

    it("should get a post by title", async () => {
        const res = await request(server).get("/blog/" + testPost.title);
        const body: iApiResponse = JSON.parse(res.text);
        const data: iBlogPost = body.data;
        
        // request should be successfull
        expect(body.status).toBe(200);

        // it should return the correct information
        expect(data).toMatchObject(testPost);
    });

    it("should fail to get a post by the wrong title", async () => {
        const res = await request(server).get("/blog/does-not-exist");
        const body: iApiResponse = JSON.parse(res.text);
        
        // no posts should be found
        expect(body.status).not.toBe(200);
    });

    it("Should edit an existing post by ID", async () => {
        testPost.author = "Robert Paulson";
        const req = testPost;
        const res = await request(server).put("/blog/edit/" + testID).send(req);
        const body: iApiResponse = JSON.parse(res.text);
        const data: iBlogPost = body.data;
        
        // request should be successfull
        expect(body.status).toBe(200);

        // it should return the correct information
        expect(data).toMatchObject(testPost);
    });

    it("Should delete a post by ID", async () => {
        const res = await request(server).delete("/blog/delete/" + testID);
        const body: iApiResponse = JSON.parse(res.text);
        const data: iBlogPost = body.data;
        
        // request should be successfull
        expect(body.status).toBe(200);

        // it should return the correct information
        expect(data).toMatchObject(testPost);

    });
});
