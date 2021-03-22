FROM node:latest

WORKDIR /app

RUN npm install

EXPOSE 8080

CMD ["npm", "prod"]