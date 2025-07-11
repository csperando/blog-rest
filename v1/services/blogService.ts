import { BaseService } from "./Base.service";
import BlogRepository, { iBlogRepo } from "../repository/BlogRepository";
import { iBlogPost } from "../models/Blog";
import winston from "winston";
import { iConfig } from "../config";

export class BlogSingleton extends BaseService {
    private static instance: BlogSingleton;
    private static repo: iBlogRepo;

    private constructor() {
        super();
    }

    public static async getInstance(config: iConfig, repo: any = null): Promise<BlogSingleton> {
        BaseService.config = config;
        
        // mock repo passed for testing
        BlogSingleton.repo = (repo) ? repo : await BlogRepository.repo();

        if(!BlogSingleton.instance) {
            // winston.info("New Blog service instance created.");
            BlogSingleton.instance = new BlogSingleton();
        }

        return BlogSingleton.instance;
    }

    /**
     * Get all blog posts
     * 
     * @returns iBlogPost[]
     */
    public async getAllBlogPosts(): Promise<iBlogPost[] | null> {
        try {
            const posts = await BlogSingleton.repo.getAllBlogPosts();
            return posts;

        } catch(err: any) {
            throw(err);
        }
    }

    /**
     * Get blogs with matching titles
     * Used to assist with search/filter
     * 
     * @param title String
     * @returns iBlogPost[]
     */
    public async getBlogPostByTitle(title: string): Promise<iBlogPost[] | null> {
        try {
            const post = await BlogSingleton.repo.getBlogPostByTitle(title);
            
            if(!post) {
                throw(new Error("Could not find blog post with the provided title."));
            }

            return post;

        } catch(err: any) {
            winston.error(err.message);
            throw(err);
        }
    }

    public async getBlogPostsByUsername(username: string): Promise<iBlogPost[] | null> {
        try {
            const posts = await BlogSingleton.repo.getBlogPostsByUsername(username);
            
            if(!posts) {
                throw(new Error("Could not find blog post with the provided author."));
            }

            return posts;

        } catch(err: any) {
            winston.error(err.message);
            throw(err);
        }
    }

    public async getBlogPostBySlug(slug: string): Promise<iBlogPost[] | null> {
        try {
            const post = await BlogSingleton.repo.getBlogPostBySlug(slug);

            if(!post) {
                throw(new Error("Could not find blog post with the title."));
            }

            return post;

        } catch(err: any) {
            winston.error(err.message);
            throw(err);
        }
    }

    public async getBlogPostByID(postID: string): Promise<iBlogPost[] | null> {
        try {
            const post = await BlogSingleton.repo.getBlogPostByID(postID) as iBlogPost[];

            if(!post) {
                throw(new Error("Could not find blog post with the provided id."));
            }

            return post;

        } catch(err: any) {
            winston.error(err.message);
            throw(err);
        }
    }
    
    public async getBlogPostsByKeyword(keyword: string): Promise<iBlogPost[] | null> {
        try {
            const posts = await BlogSingleton.repo.getBlogPostsByKeyword(keyword);

            if(!posts) {
                throw(new Error("Could not find blog posts with the provided keyword."));
            }

            return posts;

        } catch(err: any) {
            winston.error(err.message);
            throw(err);
        }
    }
    
    public async getBlogPostsByKeywordVector(embeddings: number[]): Promise<iBlogPost[] | null> {
        try {
            const posts = await BlogSingleton.repo.getBlogPostsByKeywordVector(embeddings);

            if(!posts) {
                throw(new Error("Could not find blogs with the provided vector."));
            }

            return posts;

        } catch(err: any) {
            winston.error(err.message);
            throw(err);
        }
    }

    public async addNewPost(post: iBlogPost) {
        try {
            const newPost = BlogSingleton.repo.addNewPost(post);
            return newPost;

        } catch(err: any) {
            winston.error(err.message);
            throw(err);
        }
    }

    public async editPostByID(postID: string, post: iBlogPost) {
        try {
            const updatedPost = await BlogSingleton.repo.editPostByID(postID, post);
            return updatedPost;

        } catch(err: any) {
            winston.error(err.message);
            throw(err);
        }
    }

    public async deletePostByID(postID: string) {
        try {
            const deletedPost = await BlogSingleton.repo.deletePostByID(postID);
            return deletedPost;

        } catch(err: any) {
            winston.error(err.message);
            throw(err);
        }
    }

    public async getTopKeywords() {
        try {
            const keywords = await BlogSingleton.repo.getTopKeywords();
            return keywords;
            
        } catch(err: any) {
            winston.error(err.message);
            throw(err);
        }
    }

}
