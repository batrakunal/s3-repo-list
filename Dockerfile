FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Create .env file from example if it doesn't exist
RUN touch .env

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "app.js"] 