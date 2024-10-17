import { Mongoose } from "mongoose";
import { TopKeywords } from "../Blog";

export const setupTopKeywords = async function(db: Mongoose) {

    // aggregation pipeline
    const agg = [
        // unwind the array field to get component elements
        { "$unwind": "$keywords" },

        // group these individual keyword elements and sum their occurances
        { 
            "$group": {
                _id: "$keywords",
                count: { "$sum": 1 } 
            }
        },

        // sort in descending order
        { "$sort": { "count": -1 } }
    ];

    return await TopKeywords.createCollection({
        viewOn: "blogposts",
        pipeline: agg,
    });
}
