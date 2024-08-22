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

    const getUserByUsername = async (username: string) => {
        try {
            return await User.find({ username: username });

        } catch(err: any) {
            throw(err);
        }
    }

    const insertNewUser = async (u: iUser) => {
        try {
            return await User.create(u);

        } catch(err: any) {
            throw(err);
        }
    }
    
    const editUserByID = async (userID: string, userData: any) => {
        try {
            const options = { new: true };
            return await User.findByIdAndUpdate(userID, userData, options);

        } catch(err: any) {
            throw(err);
        }
    }

    const deleteUserByID = async (userID: string) => {
        try {
            // const options = { new: true };
            return await User.findByIdAndDelete(userID);

        } catch(err: any) {
            throw(err);
        }
    }

    return {
        getAllUsers,
        getUserByID,
        getUserByUsername,
        insertNewUser,
        editUserByID,
        deleteUserByID,
    }
};

export default { repo };
