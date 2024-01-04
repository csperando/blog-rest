import { Router, NextFunction, Request, Response } from "express";

import { apiResponse } from "../models/apiResponse";
import { BlogPost } from "../models/Blog";
import { BlogSingleton } from "../services/blogService";

const router = Router();

let blogService: BlogSingleton

router.all("*", async (req: Request, res: Response, next: NextFunction) => {
    blogService = await BlogSingleton.getInstance();
    next();
});

/**
 * Get all blog posts
 */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await blogService.getAllBlogPosts();

        const blogResponse: apiResponse = {
            status: 200,
            errors: [],
            data: posts,
        }
        
        res.status(blogResponse.status).json(blogResponse).send();

    } catch (err: any) {
        next(err);
    }

});

/**
 * Get blog post by title
 */
router.get("/:blogTitle", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const title = req.params.blogTitle;
        const post = await blogService.getBlogPostByTitle(title);

        const blogResponse: apiResponse = {
            status: 200,
            errors: [],
            data: post,
        }
        
        res.status(blogResponse.status).json(blogResponse).send();

    } catch (err: any) {
        next(err);
    } 
    
});

export default router;
