import { Router, NextFunction, Request, Response } from "express";
import winston from "winston";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import * as _ from "lodash";

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
 * 
 * Example Response:
 * {
 *  success: 200,
 *  errors: [],
 *  data: [
 *      {
 *          <blog post object>
 *      },
 *      {
 *          <blog post object>
 *      },
 *  ]
 * }
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
 * 
 * Example response:
 * {
 *  success: 200,
 *  errors: [],
 *  data: [
 *      {
 *          _id: "Vue.js",
 *          count: 5,
 *      },
 *      {
 *          _id: "Git",
 *          count: 3,
 *      },
 *  ]
 * }
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
 * Get blog post by slug
 * This is the primary method the front-end uses to get posts
 * The slug should simply be the title with dashes for whitespace
 * The slug is generated with mongoose using the .pre methods
 * 
 * example response:
 * 
    {
        "status": 200,
        "errors": [],
        "data": {
            "_id": "67f42be1ca8a44b003e684d2",
            "title": "A poem",
            "author": "Coleman Sperando",
            "author_id": "csperando4",
            "keywords": [],
            "created": "Mon Apr 07 2025 13:47:45 GMT-0600 (Mountain Daylight Time)",
            "updated": "Mon Apr 07 2025 13:47:45 GMT-0600 (Mountain Daylight Time)",
            "slug": "a-poem",
            "__v": 0
        }
    }
 * 
 */
router.get("/findBySlug/:slug", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const slug = (req.params.slug as string);
        const post = await blogService.getBlogPostBySlug(slug);

        if(post?.length) {
            const blogResponse: iApiResponse = {
                status: 200,
                errors: [],
                data: post[0],
            }
    
            res.status(blogResponse.status).json(blogResponse);
        
        } else {
            const blogResponse: iApiResponse = {
                status: 404,
                errors: [],
                data: {},
                message: "Not found.",
            }
    
            res.status(blogResponse.status).json(blogResponse);

        }

    } catch (err: any) {
        winston.error(err.message);
        next(err);
    } 
    
});

/**
 * Get blog post by blog post ID
 * The id is the automatically generated mongodb object ID for the blog post model
 * 
 * example response:
 * 
    {
        "status": 200,
        "errors": [],
        "data": {
            "_id": "67f42be1ca8a44b003e684d2",
            "title": "A poem",
            "author": "Coleman Sperando",
            "author_id": "csperando4",
            "keywords": [],
            "created": "Mon Apr 07 2025 13:47:45 GMT-0600 (Mountain Daylight Time)",
            "updated": "Mon Apr 07 2025 13:47:45 GMT-0600 (Mountain Daylight Time)",
            "slug": "a-poem",
            "__v": 0
        }
    }
 */
router.get("/find/:postID", [vBlog.isValidObjectID], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postID = req.params.postID;
        const post = await blogService.getBlogPostByID(postID);

        if(post?.length) {
            const blogResponse: iApiResponse = {
                status: 200,
                errors: [],
                data: post[0],
            }
            
            res.status(blogResponse.status).json(blogResponse);
            
        } else {
            const blogResponse: iApiResponse = {
                status: 404,
                errors: [],
                data: {},
                message: "Not found",
            }
            
            res.status(blogResponse.status).json(blogResponse);

        }

    } catch (err: any) {
        winston.error(err.message);
        next(err);
    } 
    
});

/**
 * Find blog posts by query string options
 * 
 * Allowed query parameters:
 *      keywords, title
 * 
 * example response:
 * 
    {
        "status": 200,
        "errors": [],
        "data": [
            { <blog post object },
            { <blog post object },
        ]
    }
 */
router.get("/find", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const promises: Promise<iBlogPost[] | null>[] = [];

        const keyword = (req.query.keyword as string);
        if(keyword) {
            promises.push(blogService.getBlogPostsByKeyword(keyword));
        }
        
        const title = (req.query.title as string);
        if(title) {
            promises.push(blogService.getBlogPostByTitle(title));
        }

        const posts: iBlogPost[] = await Promise.allSettled(promises).then((results) => {
            let output: iBlogPost[] = [];
            results.forEach((m) => {
                if(m.status == "fulfilled" && m.value) {
                    output.push(...m.value);
                }
            });
            return output;
        });

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
 * 
 * TODO - delete
 * This is not being used the front-end anymore
 * 
 */
router.get("/:blogTitle", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const title = req.params.blogTitle;
        const post = await blogService.getBlogPostByTitle(title);

        if(!post?.length) {
            const blogResponse: iApiResponse = {
                status: 404,
                errors: [],
                data: {},
                message: "Not found",
            }
            
            res.status(blogResponse.status).json(blogResponse);
            
        } else {
            const blogResponse: iApiResponse = {
                status: 200,
                errors: [],
                data: post[0],
            }
            
            res.status(blogResponse.status).json(blogResponse);

        }


    } catch (err: any) {
        winston.error(err.message);
        next(err);
    } 
    
});

/**
 * Add new blog post
 */
router.post("/new", [auth, upload.fields([{name: "markdown", maxCount: 1}])], async (req: Request, res: Response, next: NextFunction) => {
    try {
        //validate user
        const validUser = vBlog.isValidUser(req);
        if(!validUser) {
            throw(new Error("Cannot create post for the provided user."));
        }

        // Get file data from request body using Multer middleware
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const formData = req.body;

        // prevent duplicates
        const dupes = await blogService.getBlogPostByTitle(formData.title);
        if(dupes?.length) {
            throw(new Error("Title already exists."));
        }

        // create edited post object
        const n = _.pick(formData, ["author", "title", "description", "keywords", "thumbnail", "mime"]) as iBlogPost;
        n.author_id = req.body.username;
        
        // use GitHub api to generate html from markdown file
        if(files) {
            const markdownFile = files['markdown'] ? files['markdown'][0] : null;
            n.markdown = markdownFile?.buffer.toString() || "";
            n.html = await renderHtml(n.markdown) || "";
        }

        // make sure all keywords are trimmed
        if(n.keywords) {
            n.keywords = n.keywords.map((el: any) => el.trim());
        }

        const newPost = await blogService.addNewPost(n);

        if(!newPost?.length) {
            throw(new Error("Something went wrong creating your new post."));
        }

        const response = {
            status: 200,
            errors: [],
            data: newPost[0],
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
router.put("/edit/:postID", [auth, upload.fields([{name: "markdown", maxCount: 1}])], async (req: Request, res: Response, next: NextFunction) => {
    try {
        // validate
        const validUser = vBlog.isValidUser(req);
        if(!validUser) {
            throw(new Error("Cannot create post for the provided user."));
        }

        // Parse req - Get file data from request body using Multer middleware
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const formData = req.body;

        // create edited post object
        const e = _.pick(formData, ["description", "keywords", "thumbnail", "mime"]) as iBlogPost;

        // use GitHub api to generate html from markdown file if provided
        if(files) {
            const markdownFile = files['markdown'] ? files['markdown'][0] : null;
            if(markdownFile) {
                e.markdown = markdownFile?.buffer.toString() || "";
                e.html = await renderHtml(e.markdown) || "";
            }
        }

        // make sure all keywords are trimmed
        if(e.keywords) {
            e.keywords = e.keywords.map((el: any) => el.trim());
        }

        // update model
        const postID = req.params.postID;
        const updatedPost = await blogService.editPostByID(postID, e);

        if(!updatedPost?.length) {
            throw(new Error("Something went wrong updating your post."));
        }

        const response = {
            status: 200,
            errors: [],
            data: updatedPost[0],
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

        if(!deletedPost?.length) {
            throw(new Error("Something went wrong deleting your post."));
        }

        const response = {
            status: 200,
            errors: [],
            data: deletedPost[0],
        };

        res.status(response.status).json(response);

    } catch(err: any) {
        winston.error(err.message);
        next(err);
    }
});

/**
 * Get html preview for the create/edit posts view
 */
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
