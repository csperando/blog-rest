
FROM ubuntu:latest
RUN apt-get -y update

FROM node:19.5.0-alpine
# FROM node:latest

WORKDIR /app
COPY . . 

RUN npm install
RUN npm run build


CMD ["npm", "run", "start"]
