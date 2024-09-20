import { BaseService } from "./Base.service";
// import AuthRepository from "../repository/AuthRepository";
import winston from "winston";

import jwt, { JwtPayload } from "jsonwebtoken";
import { iConfig } from "../config";

export class AuthSingleton extends BaseService {
    private static instance: AuthSingleton;
    private static repo: any;
    private static jwt_key: string;

    private constructor() {
        super();
    }

    public static async getInstance(config: iConfig): Promise<AuthSingleton> {
        BaseService.config = config;
        // AuthSingleton.repo = await AuthRepository.repo();

        if(!AuthSingleton.instance) {
            winston.info("New Auth service instance created.");
            AuthSingleton.instance = new AuthSingleton();
        }

        AuthSingleton.jwt_key = BaseService.config.jwt_key;

        return AuthSingleton.instance;
    }

    public async generateJWT(username: String) {
        try {
            const token = jwt.sign(
                { _id: username },
                AuthSingleton.jwt_key,
                { expiresIn: "1d" }
            );

            return token;
        } catch(err: any) {
            throw(err);
        }
    }

    public async validateJWT(token: any): Promise<JwtPayload> {
        try {
            return (jwt.verify(token, AuthSingleton.jwt_key) as JwtPayload);

        } catch(err: any) {
            throw(err);
        }
    }
}
