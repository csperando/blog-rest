import { BaseService } from "./Base.service";
import BlogRepository from "../repository/BlogRepository";
import { iBlogPost } from "v1/models/Blog";

export class BlogSingleton extends BaseService {
    private static instance: BlogSingleton;
    private static repo: any;

    private constructor() {
        super();
    }

    public static async getInstance(): Promise<BlogSingleton> {
        BlogSingleton.repo = await BlogRepository.repo();

        if(!BlogSingleton.instance) {
            console.log("New Blog service instance created.");
            BlogSingleton.instance = new BlogSingleton();
        }

        return BlogSingleton.instance;
    }

    public async getAllBlogPosts() {
        try {
            const posts = await BlogSingleton.repo.getAllBlogPosts();
            return posts;

        } catch(err: any) {
            throw(err);
        }
    }

    public async getBlogPostByTitle(title: string): Promise<iBlogPost | null> {
        try {
            const post = await BlogSingleton.repo.getBlogPostByTitle(title);
            
            if(!post) {
                throw(new Error("Could not find blog post with the provided title."));
            }

            return post;

        } catch(err: any) {
            throw(err);
        }
    }

    public async getBlogPostByID(postID: string): Promise<iBlogPost | null> {
        try {
            const post = await BlogSingleton.repo.getBlogPostByID(postID);

            if(!post) {
                throw(new Error("Could not find blog post with the provided id."));
            }

            return post;

        } catch(err: any) {
            throw(err);
        }
    }

    public async addNewPost(post: iBlogPost) {
        try {
            const newPost = BlogSingleton.repo.addNewPost(post);
            return newPost;

        } catch(err: any) {
            throw(err);
        }
    }

    public async editPostByID(postID: string, post: iBlogPost) {
        try {
            const updatedPost = await BlogSingleton.repo.editPostByID(postID, post);
            return updatedPost;

        } catch(err: any) {
            throw(err);
        }
    }

    public async deletePostByID(postID: string) {
        try {
            const deletedPost = await BlogSingleton.repo.deletePostByID(postID);
            return deletedPost;

        } catch(err: any) {
            throw(err);
        }
    }

}
