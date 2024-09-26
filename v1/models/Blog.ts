import { Schema, model } from "mongoose";

export interface iBlogPost {
    title: string;
    author: string;
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
