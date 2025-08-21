import dotenv from "dotenv";

dotenv.config({ quiet: true });

const config = {
    serviceName: process.env.SERVICE_NAME,
    port: process.env.PORT,
    authServiceUrl: process.env.AUTH_BASE,
    loggerServiceUrl: process.env.LOGGER_BASE,
};

export default config;