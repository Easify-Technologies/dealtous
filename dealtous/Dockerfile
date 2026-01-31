# 1. Use official Node.js image
FROM node:20-alpine AS builder

# 2. Set working directory
WORKDIR /app

# 3. Copy package.json and package-lock.json / yarn.lock
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy rest of the app
COPY . .

# 6. Build the Next.js app
RUN npm run build

# 7. Production image
FROM node:20-alpine AS runner
WORKDIR /app

# Only copy necessary files for running
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./

# Expose default Next.js port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
