FROM node:20-alpine AS base

WORKDIR /app

FROM base AS builder

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER node

EXPOSE 3000

CMD ["node", "server.js"]
