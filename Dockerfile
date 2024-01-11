




# Use an official Node.js runtime as a base image
FROM node:latest as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN NODE_ENV=development npm i


# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Use a smaller Nginx image to serve the built app
FROM nginx:alpine

# Copy the built app from the previous stage to the default Nginx public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run when the container starts
CMD ["nginx", "-g", "daemon off;"]
