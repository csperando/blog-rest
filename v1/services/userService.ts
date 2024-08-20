import { BaseService } from "./Base.service";
import UserRepository from "../repository/UserRepository";
import { iUser } from "v1/models/User";
import winston from "winston";

export class UserSingleton extends BaseService {
    private static instance: UserSingleton;
    private static repo: any;

    private constructor() {
        super();
    }

    public static async getInstance(): Promise<UserSingleton> {
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

}
