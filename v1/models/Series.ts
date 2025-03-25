import { NextFunction } from "express";
import { Schema, model } from "mongoose";
import { blogPostSchema, iBlogPost } from "./Blog";

export interface iSeries {
    title: string;
    slug?: string;
    description: string;
    keywords: string[];
    posts: [iBlogPost]
    thumbnail?: string;
    mime?: string;
    latestPost?: String;
    created?: string;
    updated?: string;
}

export const seriesSchema = new Schema<iSeries>(
    {
        title: { type: String, required: true },
        slug: { type: String, required: false },
        description: String,
        keywords: [String],
        posts: [blogPostSchema],
        thumbnail: String,
        mime: String,
        latestPost: String,
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
seriesSchema.pre("save", function(): void {
    let slug: string = this.title.trim().toLowerCase();
    this.slug = slug.replace(/ /g, "-");
    this.slug = slug;
});

// When using 'findOneAndUpdate' this is the query
seriesSchema.pre('findOneAndUpdate', function(): void {
    const doc = this.getUpdate() as iBlogPost;
    if(!doc.slug) {
        doc.slug = doc.title.trim().toLowerCase().replace(/ /g, "-");
        this.setUpdate(doc);
    }
});

export const Series = model<iSeries>("Series", seriesSchema);
