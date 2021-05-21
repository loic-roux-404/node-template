import redis from "redis";

const { REDIS_HOST, REDIS_PORT } = {
  ...{ REDIS_HOST: "127.0.0.1", REDIS_PORT: "6379" },
  ...process.env,
};

const config = {
  host: REDIS_HOST,
  port: REDIS_PORT,
};

export default redis(config);
