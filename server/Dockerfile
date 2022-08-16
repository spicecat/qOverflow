# syntax=docker/dockerfile:1
FROM node:16-alpine
WORKDIR /app
COPY ["package.json", "./"]
RUN npm install
COPY . .
EXPOSE 3001/tcp
CMD npm run start
