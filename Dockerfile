FROM mirror.gcr.io/library/node:20-alpine AS deps
WORKDIR /app
COPY package.json ./
RUN npm install

FROM mirror.gcr.io/library/node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM mirror.gcr.io/library/node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.output ./.output
COPY package.json ./
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
