import log from '../models/log.model';
import logger from '../utils/logger';

export const postLog = async (req: any, res: any) => {
    const logData = req.body;
    await log.create(logData);
    res.status(201).send('Log created');
}

export const getAllLogs = async (req: any, res: any) => {
    const logs = await log.find();
    res.status(200).json(logs);
}

export const getLogByServiceName = async (req: any, res: any) => {
    const { service_name } = req.params;
    try {
        const logs = await log.find({ service: service_name }).sort({ timestamp: -1 });
        logger.info(`Fetched logs by service name: ${service_name}`);
        res.status(200).json(logs);
    } catch (error) {
        logger.error('Error fetching logs by service name:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}