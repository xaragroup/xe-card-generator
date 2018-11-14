FROM node:8.10.0

MAINTAINER Marc P <marcp@xara.com>

RUN mkdir -p /app
RUN mkdir -p /app/exports
RUN mkdir -p /app/static

WORKDIR /app

COPY ./package.json /app/package.json

RUN npm install npm -g
RUN npm install --no-bin-links

RUN chmod 777 -R /app

CMD [ "npm", "start" ]
