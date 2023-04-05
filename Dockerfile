# Specify a base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Set environment variables
ENV PORT=8080

# Expose the port
EXPOSE $PORT
EXPOSE 4200
# Start the app
CMD [ "npm", "start" ]
