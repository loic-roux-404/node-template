import mongoose, { Connection, ConnectOptions } from "mongoose";

interface MongoEnv {
  MONGO_PASSWORD: string;
  MONGO_USERNAME: string;
  MONGO_HOSTNAME: string;
  MONGO_PORT: number;
  MONGO_DB: string;
}

/**
 * Connect to mongo
 */
export default async function (
  {
    MONGO_PASSWORD,
    MONGO_USERNAME,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB,
  }: MongoEnv,
  options: ConnectOptions
): Promise<Connection> {
  try {
    await mongoose.connect(
      `\
      mongodb://${MONGO_PASSWORD}:${MONGO_USERNAME}@${MONGO_HOSTNAME}:${MONGO_PORT}\
      /${MONGO_DB}?authSource=${MONGO_USERNAME}?ssl=false`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        serverSelectionTimeoutMS: 4000,
        ...options,
      }
    );
    return mongoose.connection;
  } catch (e) {
    console.error("Database error", e);
    throw e;
  }
}
