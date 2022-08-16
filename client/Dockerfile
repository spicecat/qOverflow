# syntax=docker/dockerfile:1
FROM node:16-alpine
WORKDIR /app
COPY ["package.json", "./"]
RUN apk update
RUN npm install
COPY . .
EXPOSE 3000/tcp
CMD npm start