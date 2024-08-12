import { Router, NextFunction, Request, Response } from "express";

import { iApiResponse } from "../models/apiResponse";
import { BlogSingleton } from "../services/blogService";
import { ObjectId } from "mongoose";

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

        const blogResponse: iApiResponse = {
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

        const blogResponse: iApiResponse = {
            status: 200,
            errors: [],
            data: post,
        }
        
        res.status(blogResponse.status).json(blogResponse).send();

    } catch (err: any) {
        next(err);
    } 
    
});

/**
 * Get blog post by title
 */
 router.get("/find/:postID", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postID = req.params.postID;
        const post = await blogService.getBlogPostByID(postID);

        const blogResponse: iApiResponse = {
            status: 200,
            errors: [],
            data: post,
        }
        
        res.status(blogResponse.status).json(blogResponse).send();

    } catch (err: any) {
        next(err);
    } 
    
});

/**
 * Add new blog post
 */
router.post("/new", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const n = req.body;
        const newPost = await blogService.addNewPost(n);

        const response = {
            status: 200,
            errors: [],
            data: newPost,
        };

        res.status(response.status).json(response).send();

    } catch(err: any) {

    }
});

/**
 * Edit an existing blog post
 */
router.put("/edit/:postID", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postID = req.params.postID;
        const postData = req.body;
        const updatedPost = await blogService.editPostByID(postID, postData);

        const response = {
            status: 200,
            errors: [],
            data: updatedPost,
        };

        res.status(response.status).json(response).send();

    } catch(err: any) {
        next(err);
    }
});

/**
 * Delete a blog post by id
 */
router.delete("/delete/:postID", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postID = req.params.postID;
        const deletedPost = await blogService.deletePostByID(postID);

        const response = {
            status: 200,
            errors: [],
            data: deletedPost,
        };

        res.status(response.status).json(response).send();

    } catch(err: any) {
        next(err);
    }
});

export default router;
