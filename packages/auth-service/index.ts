import express from 'express';
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import redisClient from './src/utils/redisClient';
import logger from './src/utils/logger';
import authRouter from './src/routes/auth.routes';
import config from './src/config';

const app = express();
const PORT = config.port;
const SERVICE_NAME = config.serviceName;

app.use(express.json());
// app.use(
//     session({
//         store: new RedisStore({ client: redisClient }),
//         secret: config.redis.sessionSecret,
//         resave: false,
//         saveUninitialized: false,
//         cookie: {
//             secure: false, // true in production with HTTPS
//             httpOnly: true,
//             maxAge: 1000 * 60 * 60, // 1 hour
//         },
//     })
// );
app.use('/api/v1/', authRouter);

app.listen(PORT, () => {
    logger.info(`${SERVICE_NAME?.toUpperCase()} is running at port ${PORT}`)
})