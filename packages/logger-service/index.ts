import express from 'express';
import dotenv from 'dotenv';

import logger from './src/utils/logger';
import connectToDatabase from './src/database/config';
import logRouter from './src/routes/log.routes';

dotenv.config({ quiet: true });

const app = express();
// http://localhost:8011/api/v1/
app.use(express.json());
app.use('/api/v1', logRouter);

const startServer = async () => {
    await connectToDatabase();
    app.listen(process.env.PORT, () => {
        logger.info(`${process.env.SERVICE_NAME?.toUpperCase()} running on port ${process.env.PORT}`);
    });
}

startServer();