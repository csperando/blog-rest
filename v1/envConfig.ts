import * as dotenv from "dotenv";
import assert from "assert";

dotenv.config();

const {
    rest_port,
    rest_port_test,
    rest_version,
    NODE_ENV,
} = process.env;

assert(rest_port, "[rest_port] is required.");
assert(rest_port_test, "[rest_port_test] is required.");
assert(rest_version, "[rest_version] is required.");
assert(NODE_ENV, "[NODE_ENV] is required.");

export interface iConfig{
	env: string;
	rest_port: number | string;
	rest_port_test: number | string;
	rest_version: string;
}

export const config: iConfig = {
	env: NODE_ENV,
	rest_port: rest_port,
	rest_port_test: rest_port_test,
	rest_version: rest_version,
}
