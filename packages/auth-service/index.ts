import express from 'express';
import dotenv from 'dotenv';

import logger from './src/utils/logger';
import authRouter from './src/routes/auth.routes';

dotenv.config({ quiet: true });
const app = express();
const PORT = process.env.PORT;
const SERVICE_NAME = process.env.SERVICE_NAME;

app.use(express.json());
app.use('/auth', authRouter);

app.listen(PORT, () => {
    logger.info(`${SERVICE_NAME?.toUpperCase()} is running at port ${PORT}`)
})