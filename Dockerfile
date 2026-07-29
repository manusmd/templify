# syntax=docker/dockerfile:1
# Next.js (standalone output) → a lean runtime image. Includes Prisma's generated
# client + engines for runtime queries, and the Prisma CLI + schema/migrations so
# an init step can run `prisma migrate deploy` against Postgres before the app serves.

FROM node:22-slim AS base
WORKDIR /app
# openssl is required by Prisma's query/migration engines
RUN apt-get update -y && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

FROM base AS deps
COPY package.json package-lock.json ./
# schema must be present so the postinstall `prisma generate` succeeds
COPY prisma ./prisma
RUN npm ci

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production HOSTNAME=0.0.0.0 PORT=3000
WORKDIR /app
# Next standalone server + static/public assets
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
# Full node_modules (superset of the standalone's pruned set — the app runtime keeps
# working, and the Prisma CLI has all its deps for `migrate deploy`) + schema/migrations.
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
EXPOSE 3000
CMD ["node", "server.js"]
