import express from "express";
import config from "./src/config";
import proxy from "./src/proxy";
import logger from "./src/utils/logger";

const app = express();
app.use(express.json());
// http://localhost:8001/api/v1/
app.use("/auth", proxy(config.authServiceUrl!, "/api/v1"));
// http://localhost:8011/api/v1/logs
app.use("/logger", proxy(config.loggerServiceUrl!, "/api/v1"));
app.get("/health", (req, res) => { res.status(200).json({ status: "ok" }); });

app.listen(config.port, () => {
    logger.info(`${config.serviceName?.toUpperCase()} running on port ${config.port}`);
});