import { BaseService } from "./Base.service";
import axios from "axios";
import BlogRepository from "../repository/BlogRepository";
import { BlogPost } from "v1/models/Blog";

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

    public async getBlogPostByTitle(title: string): Promise<BlogPost | null> {
        try {
            const post = BlogSingleton.repo.getBlogPostByTitle(title);
            return post;

        } catch(err: any) {
            throw(err);
        }
    }

}
