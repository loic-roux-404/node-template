import { controllers, mongoInit, containerInit } from './config/index.js'
import express from 'express'
import { attachControllers } from '@decorators/express'
import morgan from 'morgan'

const app = express()

mongoInit()
containerInit()

// Init builded app router
attachControllers(app, controllers)

app.use(morgan('combined'));

// Server init
const { IP, PORT } = {
  ...{ IP: '127.0.0.1', PORT: '80' },
  ...process.env
}

app.listen(PORT, IP, () => {
  console.info(`Server running at http://${IP}:${PORT}`)
})
