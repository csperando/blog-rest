
import * as winston from "winston";

/*
    const levels = {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6
    };
*/



export const setupLogs = function () {
	const myFormat = winston.format.printf(
		({ level, message, label, timestamp }) => {
			return `${timestamp} [${label}] ${level}: ${message}`;
		}
	);

	winston.configure({
		format: winston.format.combine(
			winston.format.timestamp(),
			myFormat
		),

		transports: [
			new winston.transports.File({
				filename: "./logs/error.log",
				level: "error",
			}),
			new winston.transports.File({
				filename: "./logs/info.log",
				level: "info",
			}),
			new winston.transports.File({
				filename: "./logs/exceptions.log",
				handleExceptions: true,
			}),
			new winston.transports.Console(),
		],
	});

	process.on("warning", (e) => {
		winston.error(e.stack);
		console.warn(e.stack);
	});

	winston.exceptions?.handle(
		new winston.transports.File({
			filename: "./logs/exceptions.log",
			maxsize: 10000,
            maxFiles: 60,
			handleExceptions: true,
		})
	);

	process.on("unhandledRejection", (ex:any) => {
		console.warn(ex.stack);
		winston.error("UNHANDLED REJECTION")
		winston.error(ex.stack);
		throw ex;
	});
    
	return winston;
};
