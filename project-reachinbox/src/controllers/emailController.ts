import { Request, Response } from 'express';
import { classifyEmail, generateResponse } from '../services/openAIService';
import { sendEmailGmail,getAuthUrl } from '../services/googleService';
import { sendEmailOutlook, setCredentials } from '../services/outlookService';

export const receiveEmail = async (req: Request, res: Response) => {
  // Handle receiving email
  res.status(200).send({ message: 'Email received' });
};

export const classifyAndRespond = async (req: Request, res: Response) => {
  const emailContent = req.body.emailContent;
  const label = await classifyEmail(emailContent);
  const response = await generateResponse(emailContent);

  // Example: determine service to use (Gmail/Outlook) and send response
  if (label === 'Interested' || label === 'More information') {
    // Example for Gmail
    await sendEmailGmail("kanjiyayash27@gmail.com","cool","yash");
    // Example for Outlook
    await sendEmailOutlook("123","kanjiyayash27@gmail.com","microsoft mail","cool");
  }

  res.status(200).send({ label, response });
};
