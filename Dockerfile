FROM node:14.15.4-alpine3.10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci
COPY . .

EXPOSE 4000
CMD npm run start
