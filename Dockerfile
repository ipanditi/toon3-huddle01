FROM node:latest AS build

# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /build

# Copy package and package-lock 
COPY package.json package-lock.json ./

# Clean install dependencies based package-lock
# Note: We also install dev deps as typeScript may be needed
RUN npm i

# Copy files
# Use .dockerignore to avoid copying node_modules and others folders and files
COPY . .

# Build application
RUN npm run build

# =======================================
# Image distroless final
# =======================================

FROM gcr.io/distroless/nodejs:14

# Mark as prod, disable telemetry, set port
ENV NODE_ENV production
ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app

# Copy from build
COPY --from=build /build/next.config.js .
COPY --from=build /build/public/ ./public
COPY --from=build /build/.next ./.next
COPY --from=dependencies /dependencies/node_modules ./node_modules

EXPOSE 3000

# Run app command
CMD ["node_modules/.bin/next", "start"]

# # Use the official Node.js 14 image as the base image
# FROM node:latest

# # Create and set the working directory in the container
# WORKDIR /app

# # Copy package.json and package-lock.json to the working directory
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm install

# # Copy the entire application to the working directory
# COPY . .

# # Build the Next.js app for production
# RUN npm run build

# # Set the command to start the Next.js app
# CMD ["npm", "start"]
