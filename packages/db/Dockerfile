FROM node:18

WORKDIR /app

# Install ts-node globally for seed script
RUN npm install -g ts-node typescript

# Copy package files first
COPY package*.json ./
COPY packages/db/package*.json ./packages/db/

# Install dependencies
RUN npm ci

# Copy all packages (to get any shared configs)
COPY packages/ ./packages/

# Generate Prisma client
RUN cd packages/db && npx prisma generate

WORKDIR /app/packages/db

# Default command
CMD ["npx", "prisma", "migrate", "deploy"]
