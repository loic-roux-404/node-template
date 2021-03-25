import { routerBootstraped, Container, DbAuth } from './config/index.js'
import express from 'express'
import bodyParser from 'body-parser'

const app = express()

DbAuth()

app.locals = Container

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// Init builded app router
app.use('/', routerBootstraped)

// API Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT , DELETE')
  next()
})

// Server init
const { IP, PORT } = {
  ...{
    IP: '127.0.0.1',
    PORT: '80'
  },
  ...process.env
}

app.listen(PORT, IP, () => {
  console.info(`Server running at http://${IP}:${PORT}`)
})
