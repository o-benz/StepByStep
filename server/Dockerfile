FROM node:16-alpine as builder

WORKDIR /usr/src/server

COPY .. /usr/src/

RUN npm ci

RUN npm run build

FROM node:16-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/server/.env /usr/src/app
COPY --from=builder /usr/src/server/out /usr/src/app/out
COPY --from=builder /usr/src/server/package*.json /usr/src/app

RUN npm ci

EXPOSE 3000

CMD ["node", "out/server/app/index.js"]
