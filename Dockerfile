FROM node:9.5-alpine

MAINTAINER Marc P <marcp@xara.com>

RUN npm install

CMD [ "npm", "start" ]
