import morgan from 'morgan'
import path from 'path'
import fs from 'fs'

const { LOG_DIR } = {
  LOG_DIR: `${process.env.INIT_CWD}/logs`,
  ...process.env
}

morgan.token('error', function getError({ error }) {
  return `Error: ${error.toString()} ${error.stack?.toString() || ''}`
})

morgan.format('_error', ':remote-addr [:date[clf]] ":method :url" :status ":error"')

export const LoggerMiddleware = morgan('combined', {
  stream: fs.createWriteStream(path.join(LOG_DIR, 'access.log'), { flags: 'a' })
})

export const LoggerErrorMiddleware = morgan('_error', {
  stream: fs.createWriteStream(path.join(LOG_DIR, 'error.log'), { flags: 'a' }),
  skip: (_, req) => {
    return req.error
  }
})
