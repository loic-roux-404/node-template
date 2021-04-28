import { controllers, mongoInit, containerInit } from "./config/index.js";
import express from "express";
import { attachControllers } from "@decorators/express";
import {
  LoggerMiddleware,
  LoggerErrorMiddleware,
} from "./middlewares/LoggerMiddleware";
import bodyParser from "body-parser";

const app = express();

// Scaffold app
mongoInit();
containerInit();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(LoggerMiddleware);
app.use(LoggerErrorMiddleware);
// For decorators
attachControllers(app, controllers);

// Server init
const { NODE_ENV, IP, PORT } = {
  ...{ IP: "0.0.0.0", PORT: "80" },
  ...process.env,
};

app.listen(PORT, IP, () => {
  console.info(`Running in ${NODE_ENV} environment`);
  console.info(`Server running at http://${IP}:${PORT}`);
});
