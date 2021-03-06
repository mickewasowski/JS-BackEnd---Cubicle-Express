const { jwtTokenName, jwtSecret } = require('../constants');
const jwt = require('jsonwebtoken');

exports.auth = function (req, res, next) {
    let token = req.cookies[jwtTokenName];

    if (!token) {
        return next();
    }
    //TODO: extract jwt verify to jwt utils and convert it to promise

    jwt.verify(token, jwtSecret, function (err, decodedToken) {
        if (err) {
            return res.status(401).redirect('/login');
        }

        req.user = decodedToken;

        //for the dinamic navbar
        res.locals.user = decodedToken;

        next();
    });
};

exports.isAuth = function (req, res, next) {
    if (!req.user) {
        return res.status(401).redirect('/login');
    }

    next();
}
