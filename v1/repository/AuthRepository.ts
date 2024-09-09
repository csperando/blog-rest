// import { } from "../models/...";

// define the type of the return object from the repo() method
export interface iAuthRepo {
    getUserRoles: () => Promise<any>;
}

// main repo init function to be called in the service factories
const repo = async (): Promise<iAuthRepo> => {
    const getUserRoles = async () => {
        try {
            return false;

        } catch(err: any) {
            throw(err);
        }
    }

    return {
        getUserRoles
    }
};

export default { repo };
