import { iUser, User } from "../models/User";

const repo = async () => {
    const getAllUsers = async () => {
        try {
            return await User.find({});

        } catch(err: any) {
            throw(err);
        }
    }

    const getUserByID = async (userID: string) => {
        try {
            return await User.findById(userID);

        } catch(err: any) {
            throw(err);
        }
    }

    return {
        getAllUsers,
        getUserByID,
    }
};

export default { repo };
