# syntax=docker/dockerfile:1.12.0

FROM node:20-buster
LABEL authors="g-yachts"

WORKDIR /app/web

COPY package*.json ./

RUN npm install

COPY . .

ENV NEXT_PUBLIC_ADMIN_BASE_URI=https://www.g-yachts.com
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN --mount=type=secret,id=PAYLOAD_API_KEY,env=PAYLOAD_API_KEY \
    npm run build

EXPOSE 3000

CMD ["npm", "start"]
