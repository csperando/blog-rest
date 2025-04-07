import { iBlogPost, BlogPost, TopKeywords } from "../models/Blog";

// define the type of the return object from the repo() method
export interface iBlogRepo {
    getAllBlogPosts: () => Promise<iBlogPost[] | null>;
    getBlogPostByTitle: (title: string) => Promise<iBlogPost[] | null>;
    getBlogPostsByUsername: (author: string) => Promise<iBlogPost[] | null>;
    getBlogPostBySlug: (slug: string) => Promise<iBlogPost[] | null>;
    getBlogPostByID: (postID: string) => Promise<iBlogPost[] | null>;
    addNewPost: (postData: iBlogPost) => Promise<iBlogPost[] | null>;
    editPostByID: (postID: string, postData: iBlogPost) => Promise<iBlogPost[] | null>;
    deletePostByID: (postID: string) => Promise<iBlogPost[] | null>;
    getTopKeywords: () => Promise<any>;
    getBlogPostsByKeyword: (keyword: string) => Promise<iBlogPost[] | null>;
}

// main repo init function to be called in the service factories
const repo = async (): Promise<iBlogRepo> => {
    
    /**
     * Get all blog posts
     * Sorted by most recent
     * 
     * @returns iBlogPost[]
     */
    const getAllBlogPosts = async (): Promise<iBlogPost[]> => {
        try {
            return await BlogPost.find({}).sort({ _id: -1 });

        } catch(err: any) {
            throw(err);
        }
    }

    /**
     * Get blog post by title
     * 
     * @param title The String title of the blog post. This does not have to be case sensitive
     * @returns iBlogPost[] - mongoose document object
     */
    const getBlogPostByTitle = async (title: string) => {
        try {
            const post = await BlogPost.find({ title: title })
                .collation({ locale: "en", strength: 2 });

            return post;

        } catch(err: any) {
            throw(err);
        }
    }

    /**
     * Get all blog posts authored by the provided username
     * 
     * @param username String
     * @returns iBlogPost[]
     */
    const getBlogPostsByUsername = async (username: string) => {
        try {
            return await BlogPost.find({ author_id: username });

        } catch(err: any) {
            throw(err);
        }
    }
    
    /**
     * Get blog posts by keyword
     * 
     * @param keyword 
     * @returns iBlogPost[]
     */
    const getBlogPostsByKeyword = async (keyword: string) => {
        try {
            const re = new RegExp(keyword, "i");
            const posts = await BlogPost.find({ keywords: { $regex: re } });
            return posts;

        } catch(err: any) {
            throw(err);
        }
    }

    /**
     * Get blog post by slug
     * This is the main method for getting blog information used on the front-end
     * 
     * @param slug String unique string identifier created from the title
     * @returns iBlogPost[]
     */
    const getBlogPostBySlug = async (slug: string) => {
        try {
            return await BlogPost.find({ slug: slug });

        } catch(err: any) {
            throw(err);
        }
    }
    
    /**
     * TODO 
     * 
     * @param postID 
     * @returns 
     */
    const getBlogPostByID = async (postID: string) => {
        try {
            const p = await BlogPost.findById(postID) as iBlogPost;
            return [p];

        } catch(err: any) {
            throw(err);
        }
    }

    const addNewPost = async (postData: iBlogPost) => {
        try {
            const n: iBlogPost = await BlogPost.create(postData);
            return [n];

        } catch(err: any) {
            throw(err);
        }
    }

    const editPostByID = async (postID: string, postData: iBlogPost) => {
        try {
            const edited = await BlogPost.findOneAndUpdate( { _id: postID }, postData, { returnDocument: "after" } ) as iBlogPost;
            return [edited];

        } catch(err: any) {
            throw(err);
        }
    }

    const deletePostByID = async (postID: string) => {
        try {
            const d = await BlogPost.findByIdAndDelete(postID) as iBlogPost;
            return [d];

        } catch(err: any) {
            throw(err);
        }
    }

    const getTopKeywords = async () => {
        try {
            const keywords = await TopKeywords.find({})
                .sort({ "count": -1 })
                .limit(5)
                .lean();

            return keywords;

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
};

export default { repo };
