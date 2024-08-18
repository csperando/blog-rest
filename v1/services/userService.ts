import { BaseService } from "./Base.service";
import UserRepository from "../repository/UserRepository";
import { iUser } from "v1/models/User";

export class UserSingleton extends BaseService {
    private static instance: UserSingleton;
    private static repo: any;

    private constructor() {
        super();
    }

    public static async getInstance(): Promise<UserSingleton> {
        UserSingleton.repo = await UserRepository.repo();

        if(!UserSingleton.instance) {
            console.log("New User service instance created.");
            UserSingleton.instance = new UserSingleton();
        }

        return UserSingleton.instance;
    }

    public async getAllUsers() {
        try {
            const posts = await UserSingleton.repo.getAllUsers();
            return posts;

        } catch(err: any) {
            throw(err);
        }
    }

}
