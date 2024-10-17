import { Mongoose } from "mongoose";
import winston from "winston";

// views
import { setupTopKeywords } from "./TopKeywords";

export const setupViews = async function(db: Mongoose) {
    try {
        await setupTopKeywords(db);

        // console.log(db.connections[0].collections);
        winston.info("Views created.");

    } catch(err: any) {
        // console.error(err);
        winston.error(err.message);
    }
};
