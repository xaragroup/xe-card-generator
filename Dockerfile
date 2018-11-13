FROM node:8.10.0

MAINTAINER Marc P <marcp@xara.com>

RUN npm install

# cmd to start service
CMD [ "npm", "start" ]
