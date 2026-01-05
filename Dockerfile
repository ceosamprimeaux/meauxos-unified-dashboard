# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY tailwind.config.ts ./
COPY postcss.config.mjs ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the Next.js app
RUN npm run build

# Production stage - serve static files
FROM nginx:alpine

# Copy built static files from Next.js
COPY --from=builder /app/out /usr/share/nginx/html

# Create nginx configuration for Cloud Run (port 8080)
RUN echo 'server { \
    listen 8080; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri.html $uri/ /index.html; \
    } \
    location /_next/static { \
        add_header Cache-Control "public, max-age=31536000, immutable"; \
    } \
    # Security headers \
    add_header X-Frame-Options "SAMEORIGIN" always; \
    add_header X-Content-Type-Options "nosniff" always; \
}' > /etc/nginx/conf.d/default.conf

# Cloud Run requires port 8080
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
