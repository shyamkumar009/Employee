# Use an official Node.js image as the base
FROM node:23-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (change 3000 if needed)
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
