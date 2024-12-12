# Build Stage
FROM node:22.8.0-slim AS builder
RUN apt update -y && apt install -y openssl
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
COPY prisma ./prisma/
RUN npm install --omit=dev --no-cache
COPY . .
RUN npm install prisma --no-cache
RUN npx --yes prisma migrate dev
RUN npm run build

# Production Stage
FROM node:22.8.0-slim
RUN apt update -y && apt install -y openssl
WORKDIR /usr/src/app
COPY --chown=node:node --from=builder /usr/src/app/.next ./.next
COPY --chown=node:node --from=builder /usr/src/app/public ./public
COPY --chown=node:node --from=builder /usr/src/app/prisma/db ./prisma/db
COPY --chown=node:node --from=builder /usr/src/app/package.json ./
COPY --chown=node:node --from=builder /usr/src/app/package-lock.json ./
COPY --chown=node:node --from=builder /usr/src/app/next.config.ts ./
COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules
USER node
CMD [ "npm", "run", "start" ]
