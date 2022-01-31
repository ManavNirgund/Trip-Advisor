#Stage 0
FROM node:16.13.2 as build

WORKDIR /app
COPY package*.json ./

