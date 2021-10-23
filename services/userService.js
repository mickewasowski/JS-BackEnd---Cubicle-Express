const User = require('../models/User');
const bcrypt = require('bcrypt');
const { jwtSecret } = require('../constants');
const { jwtSign } = require('../utils/jwtUtils');

exports.register =  function (username, password, repeatPass) {  //async

    if (password != repeatPass) {
        throw {message: 'Passwords do not match!'};
    }else{
        return User.create({username, password, repeatPass});
    }
    
};

exports.login = function (username, password) {
    return User.findByUsername(username)
        .then(user => {
            return Promise.all([user.validatePassword(password), user])
        })
        .then(([isValid, user]) => {
            if (isValid) {
                return user;
            } else {
                throw { message: 'Invalid username or password!' };
            }
        })
        .catch(() => null);
}

exports.createToken = function (user) {
    let payload = {
        _id: user._id,
        username: user.username
    };

    return jwtSign(payload, jwtSecret);
}

