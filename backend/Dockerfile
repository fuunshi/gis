# Backend Dockerfile
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the backend port
EXPOSE 1337

# Default command to start backend service
CMD ["npm", "run", "start"]
