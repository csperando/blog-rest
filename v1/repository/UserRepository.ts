import { iUser, User } from "../models/User";

// define the type of the return object from the repo() method
export interface iUserRepo {
    getAllUsers: () => Promise<any>;
    getUserByID: (userID: string) => Promise<any>;
    getUserByUsername: (username: string) => Promise<any>;
    insertNewUser: (userData: iUser) => Promise<any>;
    editUserByID: (userID: string, userData: any) => Promise<any>;
    deleteUserByID: (userID: string) => Promise<any>;
}

// main repo init function to be called in the service factories
const repo = async (): Promise<iUserRepo> => {
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

    const insertNewUser = async (userData: iUser) => {
        try {
            return await User.create(userData);

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
