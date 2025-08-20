import mongoose from 'mongoose';
import logger from '../utils/logger';

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!, {
            dbName: process.env.MONGO_DB_NAME!,
        });
        logger.info("Connected to MongoDB");
    } catch (error) {
        logger.error("Error connecting to MongoDB:", error);
    }
};

export default connectToDatabase;
