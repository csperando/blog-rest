// import { iBlogPost, BlogPost } from "../models/Blog";

const repo = async () => {
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
