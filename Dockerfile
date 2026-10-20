# Stage 1: Build & Validate
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY . .
RUN node --test

# Stage 2: Minimal Production Runtime
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
COPY server.js ./
USER node
EXPOSE 8080
CMD ["node", "server.js"]
