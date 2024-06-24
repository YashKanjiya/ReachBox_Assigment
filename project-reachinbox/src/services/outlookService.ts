import { ConfidentialClientApplication } from '@azure/msal-node';
import { Client } from '@microsoft/microsoft-graph-client';

import dotenv from 'dotenv';

dotenv.config();

const config = {
  auth: {
    clientId: process.env.OUTLOOK_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.OUTLOOK_TENANT_ID}`,
    clientSecret: process.env.OUTLOOK_CLIENT_SECRET!
  }
};

const cca = new ConfidentialClientApplication(config);

export const getAuthUrl = async () => {
  return await cca.getAuthCodeUrl({
    scopes: ['https://graph.microsoft.com/.default'],
    redirectUri: process.env.OUTLOOK_REDIRECT_URL!
  });
};

export const setCredentials = async (code: string) => {
  const tokenResponse = await cca.acquireTokenByCode({
    code,
    scopes: ['https://graph.microsoft.com/.default'],
    redirectUri: process.env.OUTLOOK_REDIRECT_URL!
  });
  return tokenResponse.accessToken;
};

export const sendEmailOutlook = async (accessToken: string, to: string, subject: string, message: string) => {
  const client = Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    }
  });

  await client.api('/me/sendMail').post({
    message: {
      subject: subject,
      body: {
        contentType: 'Text',
        content: message
      },
      toRecipients: [
        {
          emailAddress: {
            address: to
          }
        }
      ]
    }
  });
};

