import dotenv from 'dotenv';
dotenv.config({ quiet: true });

const config = {
    env: String(process.env.NODE_ENV) || "development",
    port: Number(process.env.PORT) || 8001,
    serviceName: String(process.env.SERVICE_NAME) || "auth",
    logging: {
        isLocal: process.env.IS_LOCAL_LOGGING || "true",
        logDir: String(process.env.LOG_DIR) || "./logs",
        isRemote: process.env.IS_REMOTE_LOGGING || "true",
        remoteLoggerUrl: String(process.env.REMOTE_LOGGER_URL) || "http://localhost:8000/logs",
    },
    redis: {
        host: String(process.env.REDIS_HOST) || "localhost",
        port: Number(process.env.REDIS_PORT) || 6379,
        password: String(process.env.REDIS_PASSWORD) || undefined,
        sessionSecret: String(process.env.SESSION_SECRET) || "supersecretkey"
    }
}

export default config;