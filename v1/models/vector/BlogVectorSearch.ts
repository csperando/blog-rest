// import { Mongoose } from "mongoose";
// import winston from "winston";

// export const BlogVectorSearch = async function(db: Mongoose) {
//     try {
//         const results = await db.Collection.aggregate([
//             [
//                 {
//                     "$vectorSearch": {
//                         "test string"
//                     }
//                 },
//                 {
//                     "$project": {
//                     "<field-to-include>": 1,
//                     "<field-to-exclude>": 0,
//                     "score": { "$meta": "vectorSearchScore" }
//                     }
//                 }
//                 ]
//         ]);

//         // console.log(db.connections[0].collections);
//         // winston.info("Views created.");

//     } catch(err: any) {
//         // console.error(err);
//         winston.error(err.message);
//     }
// };
