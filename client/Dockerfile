FROM node:16-alpine as builder

WORKDIR /usr/src/client

COPY .. /usr/src/

RUN apk add --no-cache python3 make g++ gcc

RUN npm ci

RUN npm run build

FROM node:16-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/client/dist /usr/src/app/dist
COPY --from=builder /usr/src/client/package*.json /usr/src/app
COPY --from=builder /usr/src/client/server.js /usr/src/app

RUN npm ci --only=production

EXPOSE 8080

CMD ["node", "server.js"]
