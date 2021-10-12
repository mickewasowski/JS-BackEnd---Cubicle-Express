const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async function (username, password, repeatPass) {

    let user = await User.find({ username: username }).exec();

    if (user.length > 0) {
        return "Username already in use!";
    }

    if (password == repeatPass) {

        return bcrypt.hash(password, 9)
            .then(hash => User.create({ username, password: hash }));
    } else {
        return "Passwords do not match!";
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
                throw { message: 'Invalid username or password!' }
            }
        });

}

