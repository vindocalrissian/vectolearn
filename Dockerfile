# Build stage
FROM node:20-slim AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files and build
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy build artifacts from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port (Cloud Run default is 8080, Nginx default is 80)
EXPOSE 80

# Cloud Run injects PORT environment variable, so we need to adjust nginx config
# However, for simplicity in a standard static site, we can just use 80
# and tell Cloud Run to use port 80.
CMD ["nginx", "-g", "daemon off;"]
