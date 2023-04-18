import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import _ from "lodash";
import { apiResponse } from "../models/apiResponse";

import { User } from "../models/user";

import { createUser, checkDuplicates, validateSignupRequest, validateUserById, updateUserById } from "../services/userServices";

const router = express.Router();

router.all("*", async (req: Request, res: Response, next: NextFunction) => {
    next();
});

/**
 * Sign up a new user
 */
router.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
	try {
		// generate salt
		req.body.salt = await bcrypt.genSalt(10);
		
		// validate request body
		const errorResponse = validateSignupRequest(req);
		if (errorResponse) {
			res.status(errorResponse.status);
			res.json(errorResponse);
			return res.send();
		}

		// check for duplicates
		const dupeResponse = await checkDuplicates(req);
		if (dupeResponse) {
			res.status(dupeResponse.status);
			res.json(dupeResponse);
			return res.send();
		}

		// hash password and create a new user
		const newUser = await createUser(req);
		
		const payload: apiResponse = {
			status: 200,
			errors: [],
			data: _.pick(newUser, ["_id", "username", "alias", "role"]),
		};

		res.json(payload);
		res.send();

	} catch (err: any) {
		console.log(err);

		const errorResponse: apiResponse = {
			status: 500,
			errors: [err],
			data: {
				message: err?.message,
			},
		}

		res.status(errorResponse.status);
		res.json(errorResponse);
		res.send();

	} finally {
		// next();

	}

});

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const u = await User.findOne(_.pick(req.body, ["username"]));
		if (!u) {
			const dneResponse: apiResponse = {
				status: 400,
				errors: [new Error("Username or password were incorrect.")],
				data: {
					message: "Username or password were incorrect.",
				},
			};

			res.status(dneResponse.status);
			res.json(dneResponse);
			return res.send();
		}

		const valid = await bcrypt.compare(req.body.password, u.password);
		if (!valid) {
			const pwResponse: apiResponse = {
				status: 400,
				errors: [new Error("Username or password were incorrect.")],
				data: {
					message: "Username or password were incorrect.",
				},
			};

			res.status(pwResponse.status);
			res.json(pwResponse);
			return res.send();
		}

		const userResponse: apiResponse = {
			status: 200,
			errors: [],
			data: _.pick(u, ["_id", "username", "alias", "role"]),
		};

		res.status(userResponse.status);
		res.json(userResponse);
		return res.send();

	} catch (err: any) {
		const errorResponse: apiResponse = {
			status: 500,
			errors: [err],
			data: {
				message: err?.message,
			},
		}

		res.status(errorResponse.status);
		res.json(errorResponse);
		return res.send();

	} finally {
		// next();

	}
});

router.post("/guest", async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.status(200);
		res.json({
			status: 200,
			errors: [],
			data: {
				message: "incomplete",
			}
		});
		return res.send();

	} catch (err: any) {
		res.status(500);
		res.json({
			status: 500,
			errors: [err],
			data: {
				message: err?.message || "error",
			}
		});
		return res.send();
	}
});

/**
 * 
 */
router.put("/edit/:id", async (req: Request, res: Response, next: NextFunction) => {
	try {
		// verify user id
		const inputId: string | any = req.params?.id || "";
		const valid = await validateUserById(inputId);
		if (valid) {
			res.status(valid.status);
			res.json(valid);
			return res.send();
		}

		// update user then
		const updated = await updateUserById(inputId, req);
		let updateRes = {} as apiResponse;
		if (updated) {
			updateRes = {
				status: 200,
				errors: [],
				data: _.pick(updated, ["_id", "username", "alias", "role"]),
			};
		} else {
			updateRes = {
				status: 400,
				errors: [new Error("Could not update user.")],
				data: {
					maeesage: "Could not update user."
				}
			};
		}
		
		// return new user data
		res.status(updateRes.status);
		res.json(updateRes);
		res.send();

	} catch (err: any) {
		res.status(500);
		res.json({
			status: 500,
			errors: [err],
			data: {
				message: err?.message || "error",
			}
		});
		return res.send();
	}
});

export default router;
