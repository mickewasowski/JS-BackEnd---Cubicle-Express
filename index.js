const express = require('express');

const initHandlebars = require('./config/handlebars');

const routes = require('./routes');
const config = require('./config/config.json')[process.env.NODE_ENV];

const app = express();

app.use(express.urlencoded({ extended: true }));


initHandlebars(app);

app.use(express.static('static'));

app.use(routes);

app.listen(config.PORT, console.log.bind(console, `App is listening on port ${config.PORT}`));