import * as dotenv from "dotenv";
import assert from "assert";

dotenv.config({ path: "../.env" });

const {
    rest_port,
    rest_port_test,
    rest_version,
    rest_mongo_prefix,
    rest_mongo_user,
    rest_mongo_password,
    rest_mongo_host,
    rest_mongo_db,
    rest_mongo_db_dev,
    rest_mongo_db_test,
    rest_mongo_params,
    rest_jwt_key,

    NODE_ENV,

} = process.env;

assert(rest_port, "[rest_port] is required.");
assert(rest_port_test, "[rest_port_test] is required.");
assert(rest_version, "[rest_version] is required.");
assert(rest_jwt_key, "[rest_jwt_key] is required.");
assert(NODE_ENV, "[NODE_ENV] is required.");
assert(rest_mongo_prefix, "[rest_mongo_prefix] is required");
assert(rest_mongo_user, "[rest_mongo_user] is required");
assert(rest_mongo_password, "[rest_mongo_password] is required");
assert(rest_mongo_host, "[rest_mongo_host] is required");
assert(rest_mongo_db, "[rest_mongo_db] is required");
assert(rest_mongo_db_dev, "[rest_mongo_db_dev] is required");
assert(rest_mongo_db_test, "[rest_mongo_db_test] is required");
assert(rest_mongo_params, "[rest_mongo_params] is required");

export interface iConfig{
	env: string;
	rest_port: number | string;
	rest_port_test: number | string;
	rest_version: string;
    rest_mongo_prefix: string;
    rest_mongo_user: string;
    rest_mongo_password: string;
    rest_mongo_host: string;
    rest_mongo_db: string;
    rest_mongo_db_dev: string;
    rest_mongo_db_test: string;
    rest_mongo_params: string;
    rest_jwt_key: string;
}

export const config: iConfig = {
	env: NODE_ENV,
	rest_port: rest_port,
	rest_port_test: rest_port_test,
	rest_version: rest_version,
    rest_mongo_prefix: rest_mongo_prefix,
    rest_mongo_user: rest_mongo_user,
    rest_mongo_password: rest_mongo_password,
    rest_mongo_host: rest_mongo_host,
    rest_mongo_db: rest_mongo_db,
    rest_mongo_db_dev: rest_mongo_db_dev,
    rest_mongo_db_test: rest_mongo_db_test,
    rest_mongo_params: rest_mongo_params,
    rest_jwt_key: rest_jwt_key,
}
