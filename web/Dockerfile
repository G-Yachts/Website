# syntax=docker/dockerfile:1.12.0

FROM node:20-buster
LABEL authors="g-yachts"

WORKDIR /app/web

COPY package*.json ./

RUN npm install

COPY . .

ENV NEXT_PUBLIC_ADMIN_BASE_URI=https://www.g-yachts.com
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN apt-get update && apt-get install -y \
    wget \
    libdrm2 \
    libexpat1 \
    libgbm1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libudev1 \
    libvulkan1 \
    libx11-6 \
    libxcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxkbcommon0 \
    libxrandr2 \
    xdg-utils && \
    wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get install -y ./google-chrome-stable_current_amd64.deb && \
    rm -rf /var/lib/apt/lists/*

RUN --mount=type=secret,id=PAYLOAD_API_KEY,env=PAYLOAD_API_KEY \
    npm run build

EXPOSE 3000

CMD ["npm", "start"]