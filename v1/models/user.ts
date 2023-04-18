import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { config } from "../envConfig";
const JWT_KEY = config.rest_jwt_key;

interface iUser {
    username: string;
    password: string;
    salt: string;
    alias: string;
	role: string;
	_id: string;
};

const userSchema = new mongoose.Schema<iUser>({
	username: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	salt: {
		type: String,
		required: true,
	},
	alias: {
		type: String,
		default: "anon",
	},
	role: {
		type: String,
		enum: ["admin", "user", "guest"],
		default: "user",
	}
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, JWT_KEY);
	return token;
};


function validateUser(u: iUser) {
	const schema = Joi.object({
		username: Joi.string().min(5).max(20).required(),
		password: Joi.string().min(8).required(),
		salt: Joi.string().required(),
		alias: Joi.string().min(5).max(20),
		role: Joi.string(),
	});

	return schema.validate(u);
}
        
const User = mongoose.model("User", userSchema);

export {
	User,
	iUser,
    validateUser,
};
