# Email Automation Tool

This project is an email automation tool that connects to Gmail and Outlook, processes incoming emails, classifies them, and sends automated replies based on the content.

## Features

- Connect to Gmail and Outlook using OAuth
- Read and classify incoming emails
- Automatically respond to emails based on the classification
- Task scheduling using BullMQ

## Installation

```bash
npm install
```

## Running the project

```bash
npx ts-node src/server.ts
```

## Folder Structure

- `src/`: Main source code
  - `controllers/`: HTTP request handlers
  - `services/`: Business logic and external API interactions
  - `routes/`: API endpoints
  - `config/`: Configuration files
  - `middlewares/`: Middleware functions
  - `models/`: Data models
  - `types/`: TypeScript type definitions
  - `utils/`: Utility functions
- `public/`: Static files
- `views/`: HTML templates
- `.env`: Environment variables
- `.gitignore`: Git ignore rules
- `README.md`: Project documentation

