import { BaseService } from "./Base.service";
import UserRepository from "../repository/UserRepository";
import { iUser } from "../models/User";
import winston from "winston";
import _ from "lodash";
import { iConfig } from "v1/config";

export class UserSingleton extends BaseService {
    private static instance: UserSingleton;
    private static repo: any;

    private constructor() {
        super();
    }

    public static async getInstance(config: iConfig): Promise<UserSingleton> {
        BaseService.config = config;
        UserSingleton.repo = await UserRepository.repo();

        if(!UserSingleton.instance) {
            winston.info("New User service instance created.");
            UserSingleton.instance = new UserSingleton();
        }

        return UserSingleton.instance;
    }

    public async getAllUsers() {
        try {
            const users = await UserSingleton.repo.getAllUsers();
            return users;

        } catch(err: any) {
            throw(err);
        }
    }

    public async getUserByID(userID: string) {
        try {
            const user = await UserSingleton.repo.getUserByID(userID);
            return user;

        } catch(err: any) {
            throw(err);
        }
    }

    public async getUserByUsername(username: string) {
        try {
            const user = await UserSingleton.repo.getUserByUsername(username);
            return user;

        } catch(err: any) {
            throw(err);
        }
    }
    
    public async insertNewUser(u: iUser) {
        try {
            const user = await UserSingleton.repo.insertNewUser(u);
            return user;

        } catch(err: any) {
            throw(err);
        }
    }

    public async editUserByID(userID: string, userData: any) {
        try {
            return await UserSingleton.repo.editUserByID(userID, userData);

        } catch(err) {
            throw(err);
        }
    }

    public async deleteUserByID(userID: string) {
        try {
            return await UserSingleton.repo.deleteUserByID(userID);

        } catch(err) {
            throw(err);
        }
    }
}
