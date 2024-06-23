import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export const classifyEmail = async (content: string): Promise<string> => {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Classify the following email content into one of the categories: Interested, Not Interested, More information:\n\n${content}`,
    max_tokens: 50
  });

  return response.data.choices[0].text.trim();
};

export const generateResponse = async (content: string): Promise<string> => {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Generate an appropriate reply for the following email content:\n\n${content}`,
    max_tokens: 150
  });

  return response.data.choices[0].text.trim();
};
