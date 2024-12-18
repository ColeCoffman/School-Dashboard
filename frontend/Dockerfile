FROM node:23-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

# Copy the start script into the container
COPY start.sh /app/start.sh

# Use the start script as the command
CMD ["sh", "/app/start.sh"]