# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /user/src/app

# Copy package.json and package-lock.json
COPY user/package.json ./

# Install dependencies
RUN npm install

# Copy common_services
COPY common_services ../common_services

# Copy the rest of the application code
COPY user/. .

# Expose the port (default to 8081 if not set)
ARG PORT=8081
ENV PORT=${PORT}

# Start the application
CMD ["npm", "start"]