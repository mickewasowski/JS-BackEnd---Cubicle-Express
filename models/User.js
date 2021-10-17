const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        validate: [/^[a-zA-Z0-9]+$/, 'Username must contain only english alphabetical characters or numeric characters!'],
        unique: true,
        minlength: [5, 'Username must be at least 5 characters long!'],
    },
    password: {
        type: String,
        required: true,
        validate: [/^[a-zA-Z0-9]+$/, 'Password must contain only english alphabetical characters or numeric characters!'],
        minlength: [8, 'Password must be at least 8 characters long!']
    },
});

userSchema.static('findByUsername', function (username) {
    return this.findOne({ username });
});

userSchema.method('validatePassword', function (password) {
    return bcrypt.compare(password, this.password);
});

//only checking if the passwords match
userSchema.virtual('repeatPassword')
    .set(function (v) {
        if (v !== this.password) {
            throw new Error('Password mismatch!');
        }
    })

const User = mongoose.model('User', userSchema);

module.exports = User;