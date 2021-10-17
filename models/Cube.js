const mongoose = require('mongoose');


const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        validate: [/^[a-zA-Z0-9\/s]+$/, 'Name must have only english alphabetical characters, numeric characters or white space!'],
    },
    description: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 20,
        validate: [/^[a-zA-Z0-9\/s]+$/, 'Description must have only english alphabetical characters, numeric characters or white space!'],
    },
    imageUrl: {
        type: String,
        required: true,
        validate: [/^https?:\/\//i, 'Invalid image URL!']
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    accessories: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Accessory'
        }
    ]
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;