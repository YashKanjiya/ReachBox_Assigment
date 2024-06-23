import express from 'express';
import { emailRoutes } from './routes/emailRoutes';
import { configureBullMQ } from './config/bullmqConfig';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/emails', emailRoutes);

configureBullMQ();

export default app;
