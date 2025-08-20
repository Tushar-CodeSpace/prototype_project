import winston from "winston";
import fs from "fs";
import path from "path";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import log from "../models/log.model";

dayjs.extend(utc);
dayjs.extend(timezone);
const istTime = dayjs().tz("Asia/Kolkata").toDate();

// Use local date in "YYYY-MM-DD" format (IST-safe)
const dateStr = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
}).format(new Date());

const { combine, timestamp, printf, colorize, errors, splat } = winston.format;

const logDir = path.join(process.cwd(), `${process.env.LOG_DIR}`);
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const isRemoteLoggingEnabled = process.env.IS_REMOTE_LOGGING === "true";
const isLocalLoggingEnabled = process.env.IS_LOCAL_LOGGING === "true";
const serviceName = process.env.SERVICE_NAME;

// Custom format with optional remote logging
const customFormat = printf(({ level, message, timestamp, stack }) => {
    const logEntry = `${timestamp} :[${level}]: ${stack || message}`;
    if (isRemoteLoggingEnabled) {
        log.create({
            service: serviceName,
            level,
            message: stack || message,
            timestamp
        }).catch((err) => {
            console.error("Logger-service error:", err.message);
        });
    }

    return logEntry;
});

// Transports
const transports = [];

const consoleTransport = new winston.transports.Console({
    format: combine(
        colorize(),
        printf(({ level, message, timestamp, stack }) => {
            return `${timestamp} :[${level}]: ${stack || message}`;
        })
    )
});
transports.push(consoleTransport);

if (isLocalLoggingEnabled) {
    const fileTransport = new winston.transports.File({
        filename: path.join(logDir, `${serviceName}-${dateStr}.log`),
        level: "info",
        maxsize: 20 * 1024 * 1024,
        maxFiles: 7,
        tailable: true,
        zippedArchive: false
    });
    transports.push(fileTransport);
}

const logger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
        errors({ stack: true }),
        splat(),
        customFormat
    ),
    transports,
    exitOnError: false
});

export default logger;

