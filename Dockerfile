FROM node:9.5-alpine

MAINTAINER Marc P <marcp@xara.com>

WORKDIR /home/node/app

COPY ./package.json /home/node/app/package.json

RUN npm install npm -g
RUN npm install

CMD [ "npm", "start" ]
