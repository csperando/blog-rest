import { iBlogPost, BlogPost, TopKeywords } from "../models/Blog";

// define the type of the return object from the repo() method
export interface iBlogRepo {
    getAllBlogPosts: () => Promise<any>;
    getBlogPostByTitle: (title: string) => Promise<any>;
    getBlogPostsByUsername: (author: string) => Promise<any>;
    getBlogPostBySlug: (slug: string) => Promise<any>;
    getBlogPostByID: (postID: string) => Promise<any>;
    addNewPost: (postData: iBlogPost) => Promise<any>;
    editPostByID: (postID: string, postData: iBlogPost) => Promise<any>;
    deletePostByID: (postID: string) => Promise<any>;
    getTopKeywords: () => Promise<any>;
    getBlogPostsByKeyword: (keyword: string) => Promise<any>;
}

// main repo init function to be called in the service factories
const repo = async (): Promise<iBlogRepo> => {
    const getAllBlogPosts = async () => {
        try {
            return await BlogPost.find({}).sort({ _id: -1 });

        } catch(err: any) {
            throw(err);
        }
    }

    const getBlogPostByTitle = async (title: string) => {
        try {
            return await BlogPost.findOne({ title: title });

        } catch(err: any) {
            throw(err);
        }
    }

    const getBlogPostsByUsername = async (username: string) => {
        try {
            return await BlogPost.find({ author_id: username });

        } catch(err: any) {
            throw(err);
        }
    }
    
    const getBlogPostsByKeyword = async (keyword: string) => {
        try {
            const re = new RegExp(keyword, "i");
            const posts = await BlogPost.find({ keywords: { $regex: re } });
            return posts;

        } catch(err: any) {
            throw(err);
        }
    }

    const getBlogPostBySlug = async (slug: string) => {
        try {
            return await BlogPost.findOne({ slug: slug });

        } catch(err: any) {
            throw(err);
        }
    }
    
    const getBlogPostByID = async (postID: string) => {
        try {
            return await BlogPost.findById(postID);

        } catch(err: any) {
            throw(err);
        }
    }

    const addNewPost = async (postData: iBlogPost) => {
        try {
            return await BlogPost.create(postData);

        } catch(err: any) {
            throw(err);
        }
    }

    const editPostByID = async (postID: string, postData: iBlogPost) => {
        try {
            const edited = await BlogPost.findOneAndUpdate( { _id: postID }, postData, { returnDocument: "after" } );
            return edited;

        } catch(err: any) {
            throw(err);
        }
    }

    const deletePostByID = async (postID: string) => {
        try {
            return await BlogPost.findByIdAndDelete(postID);

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
