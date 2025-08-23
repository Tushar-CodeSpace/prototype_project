import winston from "winston";
import fs from "fs";
import path from "path";
import axios from "axios";
import config from "../config";

// Use local date in "YYYY-MM-DD" format (IST-safe)
const dateStr = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
}).format(new Date());

const { combine, timestamp, printf, colorize, errors, splat } = winston.format;

const logDir = path.join(process.cwd(), config.logging.logDir);
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const serviceName = config.serviceName;
const isLocalLoggingEnabled = config.logging.isLocal === "true";
const isRemoteLoggingEnabled = config.logging.isRemote === "true";
const remoteLoggerUrl = config.logging.remoteLoggerUrl;

// Custom format with optional remote logging
const customFormat = printf(({ level, message, timestamp, stack }) => {
    const logEntry = `${timestamp} :[${level}]: ${stack || message}`;

    if (isRemoteLoggingEnabled && remoteLoggerUrl) {
        axios
            .post(remoteLoggerUrl, {
                service: serviceName,
                level,
                message: stack || message,
                metadata: {},
                timestamp,
            })
            .catch((err) => {
                console.error(
                    `[logger] Failed to send log to ${remoteLoggerUrl}:`,
                    err.message
                );
            });
    }

    return logEntry;
});

// Transports
const transports: winston.transport[] = [];

const consoleTransport = new winston.transports.Console({
    format: combine(
        colorize(),
        printf(({ level, message, timestamp, stack }) => {
            return `${timestamp} :[${level}]: ${stack || message}`;
        })
    ),
});
transports.push(consoleTransport);

if (isLocalLoggingEnabled) {
    const fileTransport = new winston.transports.File({
        filename: path.join(logDir, `${serviceName}-${dateStr}.log`),
        level: "info",
        maxsize: 20 * 1024 * 1024, // 20 MB
        maxFiles: 7,
        tailable: true,
        zippedArchive: false,
    });
    transports.push(fileTransport);
}

const logger = winston.createLogger({
    level: config.env === "production" ? "info" : "debug",
    format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
        errors({ stack: true }),
        splat(),
        customFormat
    ),
    transports,
    exitOnError: false,
});

export default logger;

