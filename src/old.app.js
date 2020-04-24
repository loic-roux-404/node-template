// node and native modules
import express from 'express';
global.app = express()
import axios from 'axios'
const classApi = "http://demo.romainguillo.com/node/classe.json"

// internal modules
const injure = require(__dirname + '/modules/injure');
// vars
const hostname = process.env.IP,
  port = process.env.PORT;
// templating  
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
  res.render('index', {
    title: "BITOCO",
    content: injure.doInjur('ZOZO'),
    age: injure.getAge(1999)
  });
});

app.get('/a-propos', (req, res) => {
  res.render('index', {
    title: "JOSE",
    content: injure.doInjur('JOSE'),
    age: injure.getAge(1199)
  });
});

app.get('/ekip', (req, res) => {
  res.render('team', {
    title: "lA TEAM",
    content: require(__dirname + '/content/lorem').data,
    age: injure.getAge(1199),
    team: ['toto', 'jojo']
  });
});

app.get('/classe', function(req, res){
  axios.default.get = request(classApi, function(error, response, body){
    console.log(body)
    res.render("classe", response.data); // Va chercher index.twig dans le dossier views
  })
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
