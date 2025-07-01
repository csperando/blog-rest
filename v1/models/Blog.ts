import { Model, Schema, model } from "mongoose";
import { pipeline } from '@huggingface/transformers';
import winston from "winston";

export interface iBlogPost {
    title: string;
    author: string;
    author_id: string;
    slug?: string;
    description: string;
    keywords: string[];
    markdown: string;
    html: string;
    thumbnail?: string;
    mime?: string;
    created?: string;
    updated?: string;
    post_embedding?: number[];
    vectorSearch(embeddings: number[]): Promise<iBlogPost[]> 
}

export const blogPostSchema = new Schema<iBlogPost>(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        author_id: { type: String, required: true },
        slug: { type: String, required: false },
        description: { type: String, required: true },
        keywords: [String],
        markdown: String,
        html: String,
        thumbnail: String,
        mime: String,
        created: String,
        updated: String,
        post_embedding: { type: [Number], required: false },
    },
    {
        timestamps: {
            createdAt: "created",
            updatedAt: "updated"
        }
    }
);

// custom method
blogPostSchema.static('vectorSearch', function(embeddings: number[]) {
    const agg: any = [
        {
            "$vectorSearch": {
                "index": "blog",
                "path": "post_embedding",
                "queryVector": embeddings,
                "numCandidates": 20,
                "limit": 5,
            }
        }, {
            "$project": {
                "_id": 1,
                "title": 1,
                "slug": 1,
                "score": {
                    "$meta": "vectorSearchScore"
                },
            }
        },
    ];

    return this.aggregate(agg);
});

// when using 'save' this is the document
blogPostSchema.pre("save", async function(): Promise<void> {
    // update slug from title
    try {

        let slug: string = this.title.trim().toLowerCase();
        while(slug.indexOf(" ") != -1) {
            slug = slug.replace(" ", "-");
        }
        this.slug = slug;
    } catch(err: any) {
        winston.error(err);
    }

    // create embeddings
    try {
        const extractor = await pipeline(
            "feature-extraction",
            "mixedbread-ai/mxbai-embed-xsmall-v1",
            { device: "cpu" },
        );
        const embeddings = await extractor(this.html, { pooling: "mean", normalize: true }) as any;
        this.post_embedding = embeddings.data;
    } catch(err: any) {
        winston.error(err);
    }
});

// When using 'findOneAndUpdate' this is the query
blogPostSchema.pre('findOneAndUpdate', async function(): Promise<void> {
    // get document
    const doc = this.getUpdate() as iBlogPost;
    
    // update slug
    try {
        if(!doc.slug && doc.title) {
            doc.slug = doc.title.trim().toLowerCase().replace(/ /g, "-");
        }
    } catch(err: any) {
        winston.error(err);   
    }
    
    // create embeddings
    try {
        const extractor = await pipeline(
            "feature-extraction",
            "mixedbread-ai/mxbai-embed-xsmall-v1",
            { device: "cpu" },
        );
        const embeddings = await extractor(doc.html, { pooling: "mean", normalize: true }) as any;
        doc.post_embedding = Array.from(embeddings.data);
    } catch(err: any) {
        winston.error(err);   
    }

    this.setUpdate(doc);
});

// Extend Mongoose's Model interface with the static method
export interface BlogPostModel extends Model<iBlogPost> {
    vectorSearch(embeddings: number[]): Promise<iBlogPost[]>;
}

export const BlogPost = model<iBlogPost, BlogPostModel>("BlogPost", blogPostSchema);

// View models
export const TopKeywords = model<iBlogPost>("TopKeywords", blogPostSchema);
