import { Schema, model } from "mongoose";

export interface iUser {
    username: string;
    salt: string;
    password: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
}

const userSchema = new Schema<iUser>({
    username: { type: String, required: true },
    salt: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
});

export const User = model<iUser>("User", userSchema);
