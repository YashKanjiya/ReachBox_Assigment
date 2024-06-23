import { Queue, Worker } from 'bullmq';
import { classifyEmail, generateResponse } from './openAIService';
import { sendEmailGmail } from './googleService';
import { sendEmailOutlook } from './outlookService';

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
      await sendEmailGmail(/* oauth2Client, to, subject, response */);
      // Example for Outlook
      await sendEmailOutlook(/* accessToken, to, subject, response */);
    }
  }, { connection });
};

export const addEmailToQueue = async (emailContent: string) => {
  await emailQueue.add('processEmail', { emailContent });
};

