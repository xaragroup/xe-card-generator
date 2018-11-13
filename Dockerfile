FROM node:9.5-alpine

MAINTAINER Marc P <marcp@xara.com>

WORKDIR /home/node/app

RUN npm install

CMD [ "npm", "start" ]
