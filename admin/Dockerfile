FROM node:20-alpine as base

WORKDIR /home/node/app

# Install necessary packages for Puppeteer in both builder and runtime stages
RUN apk add --no-cache \
    udev \
    ttf-freefont \
    chromium

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

FROM base as builder

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM base as runtime

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js

WORKDIR /home/node/app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/build ./build

EXPOSE 3000

CMD ["npm", "start"]
