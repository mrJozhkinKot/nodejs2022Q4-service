FROM node:18-alpine3.17

ARG PORT

ENV PORT=${PORT:-4000}

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]

