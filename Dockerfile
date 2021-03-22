FROM node:latest

WORKDIR /app

RUN yarn

EXPOSE 8080

CMD ["yarn", "prod"]