# Use an official Node.js runtime as a base image
#FROM node@sha256:ac4c91bdd9cd1293e312096029570d1419330f151ca96756919c665c65a25cf6
FROM node:current-bullseye-slim 

#Install dumb-init
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

#Set production ready
#ENV NODE_ENV production

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy to the working directory and DROP PRIVILEGES
COPY --chown=node:node . /usr/src/app/

# Install app dependencies
RUN  npm install

#USER 
USER node

# Expose port 5000
#EXPOSE 5000


# Command to run when the container starts
CMD ["dumb-init", "npm", "start"]
