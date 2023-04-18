// import { connect } from "mongoose";
// import { iConfig } from "./envConfig";

// function getConnectionString(config: iConfig): string {
//     let connection_string = config.rest_mongo_prefix +
//         config.rest_mongo_user + ":" +
//         config.rest_mongo_password +
//         config.rest_mongo_host;
            
//     if (config.env === "test") {
//         connection_string += config.rest_mongo_db_test;
//     } else if (config.env === "dev") {
//         connection_string += config.rest_mongo_db_dev;
//     } else {
//         connection_string += config.rest_mongo_db
//     }

//     connection_string += config.rest_mongo_params;

//     return connection_string;
// }


// export default async function setup(config: iConfig): Promise<any> {
//     try {
//         const connection_string = getConnectionString(config);
//         return await connect(connection_string);

//     } catch (err: any) {
//         // console.error(err);
//     }
// }
