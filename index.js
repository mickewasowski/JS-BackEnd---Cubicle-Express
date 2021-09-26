const express = require('express');

const initHandlebars = require('./config/handlebars');

const app = express();

initHandlebars(app);

app.use(express.static('static'));

app.all('/', (req, res) => {
    res.render('index');
});

app.listen(5000, console.log.bind(console, 'App is listening on port 5000'));