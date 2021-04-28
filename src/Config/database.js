import mongoose from "mongoose";

const {
  MONGO_PASSWORD,
  MONGO_USERNAME,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
} = process.env;

export default () => {
  try {
    mongoose.Promise = Promise;
    mongoose.connect(
      `\
      mongodb://${MONGO_PASSWORD}:${MONGO_USERNAME}@${MONGO_HOSTNAME}:${MONGO_PORT}\
      /${MONGO_DB}?authSource=${MONGO_USERNAME}?ssl=false`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
  } catch (e) {
    console.error("Database error", e);
  }
};
