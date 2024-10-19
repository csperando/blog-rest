import { Router, NextFunction, Request, Response } from "express";
import winston from "winston";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import { iApiResponse } from "../models/apiResponse";
import { BlogSingleton } from "../services/blogService";
import { renderHtml } from "../services/GitHubService";

import auth from "../middleware/auth";
import { vBlog } from "../middleware/validators/blog";
import { config } from "../config";
import { iBlogPost } from "../models/Blog";

const router = Router();

let blogService: BlogSingleton

router.all("*", [], async (req: Request, res: Response, next: NextFunction) => {
    blogService = await BlogSingleton.getInstance(config);
    next();
});

/**
 * Get all blog posts
 */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        // TODO - update repo method to filter resulting columns
        const posts = await blogService.getAllBlogPosts();

        const blogResponse: iApiResponse = {
            status: 200,
            errors: [],
            data: posts,
        }
        
        res.status(blogResponse.status).json(blogResponse);

    } catch (err: any) {
        winston.error(err.message);
        next(err);
    }

});

/**
 * Get top keywords
 */
router.get("/keywords", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const keywords = await blogService.getTopKeywords();

        const response: iApiResponse = {
            status: 200,
            errors: [],
            data: keywords,
        }
        
        res.status(response.status).json(response);

    } catch (err: any) {
        winston.error(err.message);
        next(err);
    }

});

/**
 * Get blog post by blog post ID
 */
router.get("/find/:postID", [vBlog.isValidObjectID], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postID = req.params.postID;
        const post = await blogService.getBlogPostByID(postID);

        const blogResponse: iApiResponse = {
            status: 200,
            errors: [],
            data: post,
        }
        
        res.status(blogResponse.status).json(blogResponse);

    } catch (err: any) {
        winston.error(err.message);
        next(err);
    } 
    
});

/**
 * Get blog post by blog post ID
 */
router.get("/find", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const keyword = (req.query.keyword as string);
        const posts = await blogService.getBlogPostsByKeyword(keyword);

        const blogResponse: iApiResponse = {
            status: 200,
            errors: [],
            data: posts,
        }
        
        res.status(blogResponse.status).json(blogResponse);

    } catch (err: any) {
        winston.error(err.message);
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
        
        res.status(blogResponse.status).json(blogResponse);

    } catch (err: any) {
        winston.error(err.message);
        next(err);
    } 
    
});

/**
 * Add new blog post
 */
//
router.post("/new", [auth, upload.fields([{name: "markdown", maxCount: 1}])], async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get file data from request body using Multer middleware
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const formData = req.body;
        
        // use GitHub api to generate html from markdown file
        const markdownFile = files['markdown'] ? files['markdown'][0] : null;
        const markdown = markdownFile?.buffer.toString() || "";
        const html = await renderHtml(markdown);

        // parse keywords from form data or leave undefined
        formData.keywords = (formData.keywords) 
            ? (formData?.keywords as string).trim().split(",").map((el: any) => el.trim())
            : undefined;

        const n = {
            author: formData?.author,
            title: formData?.title,
            description: formData?.description,
            keywords: formData?.keywords,
            thumbnail: formData?.thumbnail,
            mime: formData?.mime,
            markdown: markdown,
            html: html,
        } as iBlogPost;

        const newPost = await blogService.addNewPost(n);

        const response = {
            status: 200,
            errors: [],
            data: newPost,
        };

        res.status(response.status).json(response);

    } catch(err: any) {
        winston.error(err.message);
        next(err);
    }
});

/**
 * Edit an existing blog post
 */
router.put("/edit/:postID", [auth], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postID = req.params.postID;
        const postData = req.body;
        const updatedPost = await blogService.editPostByID(postID, postData);

        const response = {
            status: 200,
            errors: [],
            data: updatedPost,
        };

        res.status(response.status).json(response);

    } catch(err: any) {
        winston.error(err.message);
        next(err);
    }
});

/**
 * Delete a blog post by id
 */
router.delete("/delete/:postID", [auth], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postID = req.params.postID;
        const deletedPost = await blogService.deletePostByID(postID);

        const response = {
            status: 200,
            errors: [],
            data: deletedPost,
        };

        res.status(response.status).json(response);

    } catch(err: any) {
        winston.error(err.message);
        next(err);
    }
});


router.post("/markdown", [auth, upload.fields([{name: "markdown", maxCount: 1}])], async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get file data from request body using Multer middleware
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        
        // use GitHub api to generate html from markdown file
        const markdownFile = files['markdown'] ? files['markdown'][0] : null;
        const markdown = markdownFile?.buffer.toString() || "";
        const html = await renderHtml(markdown);

        const response = {
            status: 200,
            errors: [],
            data: {
                html: html,
                markdown: markdown,
            },
        };

        res.status(response.status).json(response);

    } catch(err: any) {
        winston.error(err.message);
        next(err);
    }
})

export default router;
