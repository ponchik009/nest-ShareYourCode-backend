FROM ubuntu:latest

RUN apt-get install docker-ce docker-ce-cli containerd.io

FROM node:16.13.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]
