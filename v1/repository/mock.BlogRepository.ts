import { iBlogPost, BlogPost } from "../models/Blog";
import { iBlogRepo } from "./BlogRepository";

const mockRepo = async (): Promise<iBlogRepo> => {

    const getAllBlogPosts = async () => {
        try {
            return ['test'];
        } catch(err: any) {
            throw(err);
        }
    }

    const getBlogPostByTitle = async () => {
        try {
            return ['test'];
        } catch(err: any) {
            throw(err);
        }
    }

    const getBlogPostByID = async () => {
        try {
            return ['test'];
        } catch(err: any) {
            throw(err);
        }
    }

    const addNewPost = async () => {
        try {
            return ['test'];
        } catch(err: any) {
            throw(err);
        }
    }

    const editPostByID = async () => {
        try {
            return ['test'];
        } catch(err: any) {
            throw(err);
        }
    }

    const deletePostByID = async () => {
        try {
            return ['test'];
        } catch(err: any) {
            throw(err);
        }
    }

    return {
        getAllBlogPosts,
        getBlogPostByTitle,
        getBlogPostByID,
        addNewPost,
        editPostByID,
        deletePostByID,
    }
}

export default { mockRepo };
