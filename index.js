const express = require('express');
const initHandlebars = require('./config/handlebars');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const config = require('./config/config.json')[process.env.NODE_ENV];
const initDatabase = require('./config/database');
const { auth } = require('./middlewares/authMiddleware');
const { errorHandler } = require('./middlewares/errorHandlerMiddleware');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(auth);

initHandlebars(app);

app.use(express.static('static'));

app.use(routes);

app.use(errorHandler);

initDatabase(config.DB_CONNECTION_STRING)
    .then(() => {
        app.listen(config.PORT, console.log.bind(console, `App is listening on port ${config.PORT}`));
    })
    .catch(err => {
        console.log("Application init failed: ", err);
    });


