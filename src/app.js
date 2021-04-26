import { controllers, mongoInit, containerInit } from './config/index.js'
import express from 'express'
import { attachControllers } from '@decorators/express'
import { LoggerMiddleware, LoggerErrorMiddleware } from './middlewares/LoggerMiddleware'

const app = express()

// Bootstrap
mongoInit()
containerInit()
attachControllers(app, controllers)
app.use(LoggerMiddleware)
app.use(LoggerErrorMiddleware)

// Server init
const { IP, PORT } = {
  ...{ IP: '127.0.0.1', PORT: '80' },
  ...process.env
}

app.listen(PORT, IP, () => {
  console.info(`Server running at http://${IP}:${PORT}`)
})
