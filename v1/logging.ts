
import * as winston from "winston";

export const setupLogs = function () {
	const myFormat = winston.format.printf(
		({ level, message, timestamp }) => {
			return `${timestamp} [${level}]: ${message}`;
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

	// errors
	winston.exceptions?.handle(
		new winston.transports.File({ 
			filename: "./logs/error.log",
			level: "error",
			maxsize: 10000,
            maxFiles: 60,
			handleExceptions: true,
		})
	);

	process.on("warning", (e) => {
		winston.error(e.stack);
		console.warn(e.stack);
	});

	process.on("unhandledRejection", (ex:any) => {
		console.warn(ex.stack);
		winston.error("UNHANDLED REJECTION")
		winston.error(ex.stack);
		throw ex;
	});
    
	return winston;
};
