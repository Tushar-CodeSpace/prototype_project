import express from 'express';
import { getAllLogs, getLogByServiceName, postLog } from '../controllers/log.controller';

const router = express.Router();

router.post('/log', postLog);
router.get('/logs', getAllLogs);
router.get('/logs/:service_name', getLogByServiceName);

export default router;