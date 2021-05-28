FROM node:14-buster

ENV NODE_ENV=production

WORKDIR /app

RUN yarn && yarn etsc

EXPOSE 8080

CMD ["node", "dist/app.js"]
