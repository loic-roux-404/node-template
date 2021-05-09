/**
 * Midddleware for direct use with app
 */
import morgan from "morgan";
import path from "path";
import fs from "fs";

const { LOG_DIR } = {
  LOG_DIR: `${process.env.INIT_CWD}/logs`,
  ...process.env,
};

morgan.token("error", function getError({ error }) {
  if (!error) return "Unknown Error";
  if (process.env.NODE_ENV !== "production")
    console.error(error.constructor, error);
  return `Error: ${error.toString()} ${JSON.stringify(error.stack) || ""}`;
});

morgan.format(
  "_error",
  ':remote-addr [:date[clf]] ":method :url" :status ":error"'
);

export const LoggerMiddleware = morgan("combined", {
  stream: fs.createWriteStream(path.join(LOG_DIR, "access.log"), {
    flags: "a",
  }),
});

export const LoggerErrorMiddleware = morgan("_error", {
  stream: fs.createWriteStream(path.join(LOG_DIR, "error.log"), { flags: "a" }),
  skip: (_, req) => {
    return req.error;
  },
});
