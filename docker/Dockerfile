# Dockerfile

# 1. Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# Build for production
RUN npm run build

# 2. Production image
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app ./

ENV NODE_ENV=production
EXPOSE 8080

# Start Next.js server
CMD ["npm", "start"]
