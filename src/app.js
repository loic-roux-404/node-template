import { controllers, containerInit } from "./config/index.js";
import express from "express";
import { attachControllers } from "@decorators/express";
import {
  LoggerMiddleware,
  LoggerErrorMiddleware,
} from "./middlewares/LoggerMiddleware";
import bodyParser from "body-parser";
import server from "./server";
import oauth from "./modules/oauth";

const app = express();

(async () => {
  // Logger middlewares
  app.use(LoggerMiddleware);
  app.use(LoggerErrorMiddleware);

  server(app);
  // Auth
  const auth = await oauth(app);
  // Essential api middlewares
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // Scaffold framework
  containerInit({ auth });
  attachControllers(app, controllers);
})();
