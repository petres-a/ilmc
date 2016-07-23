FROM node:6.3
MAINTAINER Quentin Jaccarino <jaccarino.quentin@gmail.com>

ADD package.json /tmp/package.json
RUN cd /tmp && npm install --production
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

WORKDIR /app
COPY . /app/

EXPOSE 8080

RUN npm run build
CMD npm run start
