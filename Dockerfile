FROM node:20

RUN corepack enable && corepack prepare pnpm@8.7.5 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["node", "dist/server.js"]
