# Frontend Dockerfile
FROM node:16

# Set working directory
WORKDIR /app

# Create a non-root user
RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup

# Switch to non-root user
USER appuser

# Copy package.json and package-lock.json
COPY --chown=appuser:appgroup package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY --chown=appuser:appgroup . .

# Expose the React dev server port
EXPOSE 3000

# Default command to run React dev server
CMD ["npm", "run", "dev"]
