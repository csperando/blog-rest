import { Schema, model } from "mongoose";

export interface iBlogPost {
    title: string;
    author: string;
    keywords: string[];
    markdown: string;
    html: string;
    created?: string;
    updated?: string;
}

const blogPostSchema = new Schema<iBlogPost>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    keywords: [String],
    markdown: String,
    html: String,
    created: String,
    updated: String,
});

export const BlogPost = model<iBlogPost>("BlogPost", blogPostSchema);
