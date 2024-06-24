import { Queue, Worker } from 'bullmq';
import { classifyEmail, generateResponse } from './openAIService';
import { sendEmailGmail } from './googleService';
import { sendEmailOutlook, setCredentials } from './outlookService';

import dotenv from 'dotenv';

dotenv.config();

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379')
};

const emailQueue = new Queue('emailQueue', { connection });

export const configureBullMQ = () => {
  const worker = new Worker('emailQueue', async job => {
    const { emailContent } = job.data;
    const label = await classifyEmail(emailContent);
    const response = await generateResponse(emailContent);

    // Example: determine service to use (Gmail/Outlook) and send response
    if (label === 'Interested' || label === 'More information') {
      // Example for Gmail
      await sendEmailGmail("kanjiyayash27@gmail.com","google api check","cool");
      // Example for Outlook
      await sendEmailOutlook(setCredentials.toString(),"kanjiyayash27@gmail.com", "yash kanjiya","cool");
    }
  }, { connection });
};

export const addEmailToQueue = async (emailContent: string) => {
  await emailQueue.add('processEmail', { emailContent });
};

