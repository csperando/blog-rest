import * as dotenv from "dotenv";
import assert from "assert";
import { connect, Mongoose } from "mongoose";
import winston from "winston";
import { setupViews } from "./models/views";

dotenv.config();

const {
    rest_port,
    NODE_ENV,
    jwt_key,
    rest_mongo_prefix,
    rest_mongo_user,
    rest_mongo_password,
    rest_mongo_host,
    rest_mongo_db_test,
    rest_mongo_db_dev,
    rest_mongo_db,
    rest_mongo_params,
    imgur_client_id,
    imgur_client_secret,
} = process.env;

assert(rest_port, "[rest_port] is required.");
assert(NODE_ENV, "[NODE_ENV] is required.");
assert(jwt_key, "[jwt_key] is required.");
assert(rest_mongo_prefix, "[rest_mongo_prefix] is required.");
assert(rest_mongo_user, "[rest_mongo_user] is required.");
assert(rest_mongo_password, "[rest_mongo_password] is required.");
assert(rest_mongo_host, "[rest_mongo_host] is required.");
assert(rest_mongo_db_test, "[rest_mongo_db_test] is required.");
assert(rest_mongo_db_dev, "[rest_mongo_db_dev] is required.");
assert(rest_mongo_db, "[rest_mongo_db] is required.");
assert(rest_mongo_params, "[rest_mongo_params] is required.");
assert(imgur_client_id, "[imgur_client_id] is required.");
assert(imgur_client_secret, "[imgur_client_secret] is required.");

export interface iConfig {
    env: string;
    rest_port: number | string;
    jwt_key: string;
    rest_mongo_prefix: string;
    rest_mongo_user: string;
    rest_mongo_password: string;
    rest_mongo_host: string;
    rest_mongo_db_test: string;
    rest_mongo_db_dev: string;
    rest_mongo_db: string;
    rest_mongo_params: string;
    imgur_client_id: string;
    imgur_client_secret: string;
};

export const config: iConfig = {
    env: NODE_ENV,
    rest_port: rest_port,
    jwt_key: jwt_key,
    rest_mongo_prefix: rest_mongo_prefix,
    rest_mongo_user: rest_mongo_user,
    rest_mongo_password: rest_mongo_password,
    rest_mongo_host: rest_mongo_host,
    rest_mongo_db_test: rest_mongo_db_test,
    rest_mongo_db_dev: rest_mongo_db_dev,
    rest_mongo_db: rest_mongo_db,
    rest_mongo_params: rest_mongo_params,
    imgur_client_id: imgur_client_id,
    imgur_client_secret: imgur_client_secret,
};

function getConnectionString() {
    let connection_string = config.rest_mongo_prefix +
        config.rest_mongo_user + ":" +
        config.rest_mongo_password +
        config.rest_mongo_host;
            
    if (config.env === "test") {
        connection_string += config.rest_mongo_db_test;
    } else if (config.env === "dev") {
        connection_string += config.rest_mongo_db_dev;
    } else {
        connection_string += config.rest_mongo_db
    }

    connection_string += config.rest_mongo_params;

    return connection_string;
}

export async function setupDatabase(): Promise<any> {
    try {
        const connectionString = getConnectionString();
        const db: Mongoose = await connect(connectionString);
        winston.info("Connected to database [" + connectionString + "].");

        await setupViews(db);
        
        return db;

    } catch(err: any) {
        winston.error(err.message);
    }
}
