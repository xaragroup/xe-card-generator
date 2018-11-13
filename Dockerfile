FROM node:8.10.0

MAINTAINER Marc P <marcp@xara.com>

RUN npm install

CMD [ "npm", "start" ]
