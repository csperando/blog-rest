import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const JWT_KEY = process.env.rest_jwt_key;

function auth(req: Request, res: Response, next: NextFunction) {
	let response;

	try {
		const token = req.header("x-auth-token");
		if (!token) {
			res.status(401);
			response = {
				success: false,
				message: "Invalid token.",
			};
			res.json(response);
			return res.send();
		}

		const payload = jwt.verify(token, JWT_KEY as string);
		req.body.auth = payload;
        next();
        
	} catch (err) {
		res.status(400);
        response = {
            success: false,
            message: "Bad request",
        }
		res.json(response);
		return res.send();
	}
}

export default auth;
