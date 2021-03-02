FROM node:10-alpine
RUN apk add  --no-cache ffmpeg
WORKDIR /server
COPY package.json /server
RUN npm install && npm install -g nodemon
COPY . /server
CMD node server.js
EXPOSE 4000
