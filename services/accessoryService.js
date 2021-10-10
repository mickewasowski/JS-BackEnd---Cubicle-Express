const Accessory = require('../models/Accessory');

const create = async (name, description, imageUrl) => {
    let accessory = new Accessory({
        name,
        description,
        imageUrl,
    });

    return accessory.save();
};

const accessoryService = {
    create,

};

module.exports = accessoryService;
