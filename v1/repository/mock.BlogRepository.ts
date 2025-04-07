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

const mockRepo = async (): Promise<iBlogRepo> => {

    const getAllBlogPosts = async () => {
        try {
            return [testBlogPost];

        } catch(err: any) {
            throw(err);
        }
    }

    const getBlogPostByTitle = async (title: string) => {
        try {
            const b = testBlogPost;
            b.title = title;
            return [b];

        } catch(err: any) {
            throw(err);
        }
    }

    const getBlogPostsByUsername = async (author_id: string) => {
        try {
            const b = testBlogPost;
            b.author_id = author_id;
            return [b];

        } catch(err: any) {
            throw(err);
        }
    }
    
    const getBlogPostsByKeyword = async (keyword: string) => {
        try {
            const b = testBlogPost;
            b.keywords = [keyword];
            return [b];

        } catch(err: any) {
            throw(err);
        }
    }

    // TODO
    const getBlogPostBySlug = async (slug: string) => {
        try {
            return [testBlogPost];
        } catch(err: any) {
            throw(err);
        }
    }

    // TODO
    const getBlogPostByID = async (postID: string) => {
        try {
            return [testBlogPost];
        } catch(err: any) {
            throw(err);
        }
    }

    const addNewPost = async (postData: iBlogPost) => {
        try {
            const newBlogPost = postData;
            return [newBlogPost];

        } catch(err: any) {
            throw(err);
        }
    }

    const editPostByID = async (postID: string, postData: iBlogPost) => {
        try {
            const edited = testBlogPost;

            // TODO - find a better way to do this with TS
            edited.title = postData.title;
            edited.author = postData.author;
            edited.keywords = postData.keywords;
            edited.markdown = postData.markdown;
            edited.html = postData.html;
            edited.created = postData.created;
            edited.updated = postData.updated;

            return [edited];

        } catch(err: any) {
            throw(err);
        }
    }

    const deletePostByID = async () => {
        try {
            return [testBlogPost];
            
        } catch(err: any) {
            throw(err);
        }
    }

    const getTopKeywords = async () => {
        try {
            return [
                { _id: "DevOps", count: 5 },
                { _id: "GriGri", count: 3 }
            ];
            
        } catch(err: any) {
            throw(err);
        }
    }

    return {
        getAllBlogPosts,
        getBlogPostByTitle,
        getBlogPostsByUsername,
        getBlogPostBySlug,
        getBlogPostByID,
        addNewPost,
        editPostByID,
        deletePostByID,
        getTopKeywords,
        getBlogPostsByKeyword,
    }
}

export default { mockRepo };
