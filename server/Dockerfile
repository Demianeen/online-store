FROM node:18.12.0-alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm install

RUN npm config set cache /tmp --global

COPY . .

ENV PORT=4000
ENV DB_HOST=postgres

CMD [ "npm", "run", "start" ]
EXPOSE ${PORT}
