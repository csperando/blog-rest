import { NextFunction } from "express";
import { Schema, model } from "mongoose";

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
}

const blogPostSchema = new Schema<iBlogPost>(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        author_id: { type: String, required: true },
        slug: { type: String, required: false },
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

// update slug on save and update

// when using 'save' this is the document
blogPostSchema.pre("save", function(): void {
    let slug: string = this.title.trim().toLowerCase();
    
    // 'error: replaceAll does not exist on type string' ???
    while(slug.indexOf(" ") != -1) {
        slug = slug.replace(" ", "-");
    }

    this.slug = slug;
});

// When using 'findOneAndUpdate' this is the query
blogPostSchema.pre('findOneAndUpdate', function(): void {
    const doc = this.getUpdate() as iBlogPost;

    if(!doc.slug) {
        doc.slug = doc.title.trim().toLowerCase().replace(/ /g, "-");
        this.setUpdate(doc);
    }
});

export const BlogPost = model<iBlogPost>("BlogPost", blogPostSchema);


// View models

export const TopKeywords = model<iBlogPost>("TopKeywords", blogPostSchema);
