import mongoose from 'mongoose'

const {
  MONGO_PASSWORD,
  MONGO_USERNAME,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env

export default () => {
  const userPass = `${MONGO_PASSWORD}:${MONGO_USERNAME}`
  const host = `${MONGO_HOSTNAME}:${MONGO_PORT}`
  try {
    mongoose.Promise = Promise
    mongoose.connect(`mongodb://${userPass}@${host}/${MONGO_DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  } catch (e) {
    console.log('Database error : ', e)
  }
}
