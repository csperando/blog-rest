import { iBlogPost, BlogPost } from "../models/Blog";
import { iBlogRepo } from "./BlogRepository";

const testBlogPost: iBlogPost = {
    title: "This is a test",
    slug: "this-is-a-test",
    author: "Robert Paulson",
    author_id: "1234",
    description: "Sample Blog Post",
    keywords: ["movie reference"],
    markdown: "test",
    html: "<p>test</p>",
    created: "",
    updated: ""
};

const mockRepo: jest.Mocked<iBlogRepo> = {
    getAllBlogPosts: jest.fn(),
    getBlogPostByTitle: jest.fn(),
    getBlogPostsByUsername: jest.fn(),
    getBlogPostBySlug: jest.fn(),
    getBlogPostByID: jest.fn(),
    addNewPost: jest.fn(),
    editPostByID: jest.fn(),
    deletePostByID: jest.fn(),
    getTopKeywords: jest.fn(),
    getBlogPostsByKeyword: jest.fn(),
}

export default { mockRepo };
