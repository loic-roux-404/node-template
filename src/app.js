import { config } from 'dotenv'
import { Router, Container, Db } from './Config/index.js'
import express from 'express';

config({ path: `${process.env.NODE_ENV || 'development'}.env` })

const app = express()

// Server vars
const hostname = process.env.IP,
    port = process.env.PORT;

// inject globals
app.locals = Container
app.locals.db = Db

// Init builded app router
app.use("/", Router)

// Launch server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
