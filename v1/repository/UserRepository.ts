import { iUser, User } from "../models/User";

const repo = async () => {
    const getAllUsers = async () => {
        try {
            return await User.find({});

        } catch(err: any) {
            throw(err);
        }
    }

    return {
        getAllUsers,
    }
};

export default { repo };
