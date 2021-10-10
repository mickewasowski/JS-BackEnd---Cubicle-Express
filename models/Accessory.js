const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 100
    },
    imageUrl: {
        type: String,
        required: true,
        validation: [/^https?:\/\//, "imageUrl is invalid!"]
    },
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;