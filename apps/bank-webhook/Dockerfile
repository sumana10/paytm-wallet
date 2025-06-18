FROM node:18

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/bank-webhook/package*.json ./apps/bank-webhook/
COPY packages/db/package*.json ./packages/db/

# Install dependencies
RUN npm install

# Install tsx globally
RUN npm install -g tsx

# Copy source code
COPY . .

# Generate Prisma client
RUN cd packages/db && npx prisma generate

# Set environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3001

# Set working directory and start
WORKDIR /app/apps/bank-webhook
CMD ["tsx", "src/index.ts"]
