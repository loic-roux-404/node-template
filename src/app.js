import { Router, Container, Db } from './Config'
import express from 'express';
const app = express()

// Server vars
const hostname = process.env.IP,
    port = process.env.PORT;
// Templating  
app.set('view engine', 'pug');
app.set('views',__dirname+'/Views');

// inject globals
app.locals = Container
app.locals.db = Db

// Init builded app router
app.use("/", Router)

// Launch server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
