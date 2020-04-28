import Config from './Config'
import express from 'express';
const app = express()

app.use("/", Config.Routing)

// vars
const hostname = process.env.IP,
    port = process.env.PORT;
// templating  
app.set('view engine', 'pug');
app.set('views', __dirname + '/Views');

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});