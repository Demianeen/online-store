FROM node:16-alpine as builder

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=produciton
ENV REACT_APP_API_URL=http://localhost:4000/
ENV REACT_APP_CURRENCY_API_URL=https://api.apilayer.com/exchangerates_data
# TODO: Make DB_PASS secret
ENV REACT_APP_CURRENCY_APIKEY=jr18zv6f9n9fKIsalSTlIlIk9K5qpHZN

RUN npm run build 
RUN npm prune --production

CMD [ "npm", "run", "start" ]


FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
