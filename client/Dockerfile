FROM node:18.12.0-alpine AS builder

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production
ENV REACT_APP_API_URL=http://mybrandview.co.uk:8080/

RUN npm run build 
RUN npm prune --omit dev

FROM nginx:alpine AS server
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

