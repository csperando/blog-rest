import { iBlogPost, BlogPost } from "../models/Blog";

const repo = async () => {
    const getAllBlogPosts = async () => {
        try {
            return await BlogPost.find({});

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
            return await BlogPost.findOneAndUpdate( { _id: postID }, postData, { returnDocument: "after" } );

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

    return {
        getAllBlogPosts,
        getBlogPostByTitle,
        getBlogPostByID,
        addNewPost,
        editPostByID,
        deletePostByID,
    }
};

export default { repo };
