const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

userSchema.static('findByUsername', function (username) {
    return this.findOne({ username });
});

const User = mongoose.model('User', userSchema);

module.exports = User;