FROM node:16

WORKDIR /usr/app

COPY package.json ./

RUN npm install

RUN npm install cross-env

COPY . .

EXPOSE 3333

CMD npm run dev:docker
