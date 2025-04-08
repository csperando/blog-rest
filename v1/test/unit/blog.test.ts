
import { iBlogRepo } from "../../repository/BlogRepository";
import mockBlogRepo from "../../repository/mock.BlogRepository";
import { iBlogPost } from "../../models/Blog";
import { BlogSingleton } from "../../services/blogService";
import { config } from "../../config";

let repo: jest.Mocked<iBlogRepo>;
let service: any;
// let post: any;

let data: iBlogPost = {
    title: "Test Post Title",
    author: "Robert Paulson",
    author_id: "rpaulson69",
    description: "This is just for testing",
    keywords: ["test", "jest", "narcolepsy"],
    markdown: "text here",
    html: "<p>text here</p>",
}

beforeAll(async () => {
    repo = mockBlogRepo.mockRepo;
    
    repo.addNewPost.mockResolvedValue([data]);
    repo.editPostByID.mockResolvedValue([data]);
    
    service = await BlogSingleton.getInstance(config, repo);
});

describe("Unit tests for blog features", () => {
    it("Create new post", async () => {
        const p = await service.addNewPost();

        expect(p.length).toBeGreaterThan(0);
        expect(p[0]).toMatchObject(data);
    });
    
    it("Edit a post", async () => {
        const e = await service.editPostByID("1234", data);

        expect(e.length).toBeGreaterThan(0);
        expect(e[0]).toMatchObject(data);
    });
});
