# Stage 1: Build the Next.js project
FROM node:18-slim AS build

# Set the working directory
WORKDIR /usr/src/app

# Define build-time variables
ARG BREVO_API_KEY
ARG BREVO_LIST_ID

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application source code
COPY . .

# Pass build-time environment variables to Next.js
ENV BREVO_API_KEY=$BREVO_API_KEY
ENV BREVO_LIST_ID=$BREVO_LIST_ID

# Increase memory size
ENV NODE_OPTIONS="--max_old_space_size=8096"

# Build the Next.js project
RUN npm run build

# Stage 2: Serve the built files using Nginx
FROM node:18-slim

# Copy the built files from the first stage to Nginx's HTML directory
# Copy only necessary files from the build stage
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/next.config.ts ./

# Set environment variables again (Cloud Run can also override these)
ENV BREVO_API_KEY=$BREVO_API_KEY
ENV BREVO_LIST_ID=$BREVO_LIST_ID

# Expose the port Next.js will run on
ENV PORT 8080
EXPOSE 8080

# Start the Next.js app
CMD ["npm", "run", "start"]
