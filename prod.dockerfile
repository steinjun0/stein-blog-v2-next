FROM node:18
RUN mkdir /next
COPY ./.next /next/.next
COPY ./public /next/public
COPY ./next.config.js /next/next.config.js
COPY ./package.json /next/package.json
COPY ./package-lock.json /next/package-lock.json

COPY ./.env /next/.env
COPY ./.env.production /next/.env.production
COPY ./.env.production.local /next/.env.production.local

WORKDIR /next
RUN npm ci