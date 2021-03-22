import { config } from 'dotenv'
import { routerBootstraped, Container, DbAuth } from './config/index.js'
import express from 'express';
import bodyParser from 'body-parser'
import path from 'path'

// Create env
config({ path: path.resolve(`${process.env.NODE_ENV || ''}.env`) })
// Create an express instance
const app = express()

// inject globals
app.locals = Container
app.locals.db = DbAuth

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// Init builded app router
app.use("/", routerBootstraped)

// API Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT , DELETE')
    next();
})

// Server init
const { IP, PORT } = process.env

app.listen(PORT, IP, () => {
    console.info(`Server running at http://${IP}:${PORT}/`);
});
