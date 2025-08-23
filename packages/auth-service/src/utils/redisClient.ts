import Redis from "ioredis";
import logger from "./logger";
import config from "../config";

const redisClient = new Redis({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password
});

redisClient.on("connect", () => {
    logger.info("Connected to Redis");
});

redisClient.on("error", (err) => {
    logger.error("Redis error:", err);
});

export default redisClient;
