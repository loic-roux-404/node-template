import { controllers, containerInit } from "./config/index.js";
import express from "express";
import { attachControllers } from "@decorators/express";
import {
  LoggerMiddleware,
  LoggerErrorMiddleware,
} from "./middlewares/LoggerMiddleware";
import bodyParser from "body-parser";
import server from "./server";

const app = express();

// Scaffold app
containerInit();
// Classic middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(LoggerMiddleware);
app.use(LoggerErrorMiddleware);
// For decorators
attachControllers(app, controllers);

server(app);
