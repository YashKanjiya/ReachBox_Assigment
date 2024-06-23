#!/bin/bash

# Project root
mkdir project-reachinbox
cd project-reachinbox

# Main folders
mkdir src public views

# Source folders
mkdir -p src/controllers
mkdir -p src/services
mkdir -p src/routes
mkdir -p src/config
mkdir -p src/middlewares
mkdir -p src/models
mkdir -p src/types
mkdir -p src/utils

# Create empty files
touch src/app.ts
touch src/server.ts

# Create files in src/controllers
touch src/controllers/emailController.ts

# Create files in src/services
touch src/services/googleService.ts
touch src/services/outlookService.ts
touch src/services/emailService.ts
touch src/services/openAIService.ts
touch src/services/bullmqService.ts

# Create files in src/routes
touch src/routes/emailRoutes.ts

# Create files in src/config
touch src/config/oauthConfig.ts
touch src/config/bullmqConfig.ts

# Create files in src/middlewares
touch src/middlewares/authMiddleware.ts

# Create files in src/models
touch src/models/emailModel.ts

# Create files in src/types
touch src/types/emailTypes.ts

# Create files in src/utils
touch src/utils/emailUtils.ts

# Create HTML files in public and views
touch public/index.html
touch views/login.html

# Create other necessary files
touch .env
touch .gitignore
touch README.md

# Initialize npm and install necessary packages
npm init -y
npm install express dotenv googleapis @microsoft/microsoft-graph-client @azure/msal-node openai bullmq typescript ts-node @types/node @types/express --save

# Create a basic tsconfig.json
cat <<EOT >> tsconfig.json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
EOT

# Create a basic .gitignore
cat <<EOT >> .gitignore
node_modules/
dist/
.env
EOT

# Populate README.md with basic information
cat <<EOT >> README.md
# Email Automation Tool

This project is an email automation tool that connects to Gmail and Outlook, processes incoming emails, classifies them, and sends automated replies based on the content.

## Features

- Connect to Gmail and Outlook using OAuth
- Read and classify incoming emails
- Automatically respond to emails based on the classification
- Task scheduling using BullMQ

## Installation

\`\`\`bash
npm install
\`\`\`

## Running the project

\`\`\`bash
npx ts-node src/server.ts
\`\`\`

## Folder Structure

- \`src/\`: Main source code
  - \`controllers/\`: HTTP request handlers
  - \`services/\`: Business logic and external API interactions
  - \`routes/\`: API endpoints
  - \`config/\`: Configuration files
  - \`middlewares/\`: Middleware functions
  - \`models/\`: Data models
  - \`types/\`: TypeScript type definitions
  - \`utils/\`: Utility functions
- \`public/\`: Static files
- \`views/\`: HTML templates
- \`.env\`: Environment variables
- \`.gitignore\`: Git ignore rules
- \`README.md\`: Project documentation

EOT

echo "Project structure created successfully."
