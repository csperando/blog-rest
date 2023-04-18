import { Request } from "express";
import { iUser, User, validateUser } from "../models/user";
import bcrypt from "bcrypt";
import _ from "lodash";

import { apiResponse } from "../models/apiResponse";

export function validateSignupRequest(req: Request): apiResponse | void {
    const { error } = validateUser(req.body);
    if (error) {
        return {
            status: 400,
            errors: [error],
            data: {
                message: "Bad Request",
            },
        };
    }
}

export async function checkDuplicates(req: Request): Promise<apiResponse | void> {
    const dupe = await User.findOne({ username: req.body.username });
    if (dupe) {
        return {
            status: 400,
            errors: [new Error("Username already exists")],
            data: {
                message: "Username already exists",
            },
        };
    }
}

export async function validateUserById(id: string): Promise<apiResponse | void> {
    const found = await User.findOne({ _id: id });
    if (!found) {
        return {
            status: 400,
            errors: [new Error("Could not find user.")],
            data: {
                message: "Could not find user.",
            },
        };
    }
}

export async function updateUserById(id: string, req: Request): Promise<iUser | null | void> {
    const filter = { _id: id };
    const update = _.pick(req.body, ["alias"]);
    const options = { new: true };

    const u: iUser | null = await User.findOneAndUpdate(filter, update, options);
    return u;
}

export async function createUser(req: Request): Promise<iUser | void> {
    try {
        // hash password and create a new user
        req.body.password = await bcrypt.hash(req.body.password, req.body.salt);
        return await User.create(req.body);
    } catch (err) {
        // console.log(err);
    }
}
