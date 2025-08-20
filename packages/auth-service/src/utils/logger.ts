import express from "express";
import winston from "winston";
import fs from "fs";
import path from "path";
import axios from "axios";

// Use local date in "YYYY-MM-DD" format (IST-safe)
const dateStr = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
}).format(new Date());

const { combine, timestamp, printf, colorize, errors, splat } = winston.format;

const logDir = path.join(process.cwd(), `${process.env.LOG_DIR || "logs"}`);
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const isRemoteLoggingEnabled = process.env.IS_REMOTE_LOGGING === "true";
const isLocalLoggingEnabled = process.env.IS_LOCAL_LOGGING === "true";
const serviceName = process.env.SERVICE_NAME || "unknown-service";
const remoteLoggerUrl = process.env.REMOTE_LOGGER_URL;

// Debug log for startup
if (isRemoteLoggingEnabled) {
    console.log(`[logger] Remote logging enabled → ${remoteLoggerUrl}`);
}
if (isLocalLoggingEnabled) {
    console.log(`[logger] Local logging enabled → ${logDir}`);
}

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
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
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

