FROM node:10-alpine
RUN apk add  --no-cache ffmpeg
WORKDIR /server
COPY package.json /server
RUN npm install
COPY . /server
CMD node server.js
EXPOSE 4000
