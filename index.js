const express = require('express');

const initHandlebars = require('./config/handlebars');

const routes = require('./routes');
const config = require('./config/config.json')[process.env.NODE_ENV];
const initDatabase = require('./config/database');

const app = express();

app.use(express.urlencoded({ extended: true }));

initHandlebars(app);

app.use(express.static('static'));

app.use(routes);

initDatabase(config.DB_CONNECTION_STRING)
    .then(() => {
        app.listen(config.PORT, console.log.bind(console, `App is listening on port ${config.PORT}`));
    })
    .catch(err => {
        console.log("Application init failed: ", err);
    });


