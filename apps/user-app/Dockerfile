FROM node:18

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/user-app/package*.json ./apps/user-app/
COPY packages/db/package*.json ./packages/db/
COPY packages/store/package*.json ./packages/store/

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client
RUN cd packages/db && npx prisma generate

# Build the app
ENV NEXT_TELEMETRY_DISABLED=1
RUN cd apps/user-app && npm run build

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Set working directory and start
WORKDIR /app/apps/user-app
CMD ["npx", "next", "start"]
