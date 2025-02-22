import { Schema, model } from "mongoose";

export interface iBlogPost {
    title: string;
    author: string;
    author_id: string;
    description: string;
    keywords: string[];
    markdown: string;
    html: string;
    thumbnail?: string;
    mime?: string;
    created?: string;
    updated?: string;
}

const blogPostSchema = new Schema<iBlogPost>(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        author_id: { type: String, required: true },
        description: String,
        keywords: [String],
        markdown: String,
        html: String,
        thumbnail: String,
        mime: String,
        created: String,
        updated: String,
    },
    {
        timestamps: {
            createdAt: "created",
            updatedAt: "updated"
        }
    }
);

export const BlogPost = model<iBlogPost>("BlogPost", blogPostSchema);


// View models

export const TopKeywords = model<iBlogPost>("TopKeywords", blogPostSchema);
