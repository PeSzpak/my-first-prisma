FROM node:lts-alpine

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

RUN chown -R node:node /home/node/app

USER node

CMD ["npm", "run", "start:dev"]
