# Base image
FROM node:22.12.0-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# --------------------
# Stage 1: Dependencies
# --------------------
FROM base AS deps

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm@9.12.2 && pnpm install --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# --------------------
# Stage 2: Build
# --------------------
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm@9.12.2 && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# --------------------
# Stage 3: Runtime
# --------------------
FROM base AS runner

ENV NODE_ENV=production
ENV PORT=8080
ENV HOSTNAME=0.0.0.0
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
RUN mkdir .next && chown nextjs:nodejs .next

# Standalone build output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 8080

CMD HOSTNAME="0.0.0.0" node server.js
