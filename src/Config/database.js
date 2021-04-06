import mongoose from 'mongoose'

const {
  MONGO_PASSWORD,
  MONGO_USERNAME,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env

export default () => {
  // const params = 'mongodb://admin:*****@localhost:27017/bdd?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false'
  try {
    mongoose.Promise = Promise
    mongoose.connect(`\
      mongodb://${MONGO_PASSWORD}:${MONGO_USERNAME}@${MONGO_HOSTNAME}:${MONGO_PORT}\
      /${MONGO_DB}?authSource=${MONGO_USERNAME}?ssl=false`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  } catch (e) {
    console.log('Database error : ', e)
  }
}
