import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure you have your API key set in your environment variables
});

export const classifyEmail = async (emailContent: string): Promise<string> => {
  // Use the OpenAI API to classify the email
  const response = await openai.completions.create({
    model: 'text-davinci-003',
    prompt: `Classify the following email content: ${emailContent}`,
    max_tokens: 10,
  });

  const label = response.choices[0].text?.trim() || '';
  return label;
};

export const generateResponse = async (emailContent: string): Promise<string> => {
  // Use the OpenAI API to generate a response
  const response = await openai.completions.create({
    model: 'text-davinci-003',
    prompt: `Generate a response to the following email content: ${emailContent}`,
    max_tokens: 150,
  });

  const generatedResponse = response.choices[0].text?.trim() || '';
  return generatedResponse;
};
