import { iVisit, Visit } from "../models/Analytics";

// define the type of the return object from the repo() method
export interface iAnalyticsRepo {
    logVisitor: (data: any) => Promise<any>;
}

// main repo init function to be called in the service factories
const repo = async (): Promise<iAnalyticsRepo> => {

    const logVisitor = async (data: any): Promise<any> => {
        try {
            return await Visit.findOneAndUpdate(
                { token: data.token },
                { $set: {
                    token: data.token,
                    visits: data.visits,
                    userAgent: data.userAgent,
                    window: data.window,
                    ip: data.ip,
                }},
                { upsert: true, new: true }
            );

        } catch(err: any) {
            throw(err);
        }
    }

    return {
        logVisitor,
    }
};

export default { repo };
