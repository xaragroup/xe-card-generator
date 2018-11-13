FROM node:9.5-alpine

MAINTAINER Marc P <marcp@xara.com>

WORKDIR /home/node/app

COPY ./package.json /home/node/app/package.json
COPY ./package-lock.json /home/node/app/package-lock.json

RUN npm install npm -g
RUN npm install --no-bin-links

CMD [ "npm", "start" ]
