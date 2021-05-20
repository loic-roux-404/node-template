import { controllers, containerInit } from "./config/index.js";
import express from "express";
import { attachControllers } from "@decorators/express";
import {
  LoggerMiddleware,
  LoggerErrorMiddleware,
} from "./middlewares/LoggerMiddleware";
import bodyParser from "body-parser";
import server from "./server";
import { oidc, passportPromise } from "./modules/oauth";

const app = express();

(async () => {
  // Authentication part
  app.enable("trust proxy");
  app.use("/auth", oidc.callback());
  // App part
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // Classic middlewares
  app.use(LoggerMiddleware);
  app.use(LoggerErrorMiddleware);

  server(app);
  // Passport authenticator init
  const passport = await passportPromise;
  app.use(passport.initialize());

  // Scaffold framework
  await containerInit();
  attachControllers(app, controllers);
})();
