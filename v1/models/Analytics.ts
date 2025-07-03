import { Schema, model } from "mongoose";

interface iAnalyticsWindowData {
    width: number;
    height: number;
}

export interface iVisit {
    token: string,
    ip: string;
    userAgent: string;
    window: iAnalyticsWindowData;
    visits: number;
}

export const visitSchema = new Schema<iVisit>(
    {
        token: { type: String, required: true },
        ip: { type: String, required: true },
        userAgent: { type: String, required: true },
        window: { type: Object, required: true },
        visits: { type: Number, required: false },
    },
    {
        timestamps: {
            createdAt: "created",
            updatedAt: "updated"
        }
    }
);

export const Visit = model<iVisit>("Visit", visitSchema);
