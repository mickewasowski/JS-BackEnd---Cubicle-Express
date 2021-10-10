const Accessory = require('../models/Accessory');

const create = async (name, description, imageUrl) => {
    let accessory = new Accessory({
        name,
        description,
        imageUrl,
    });

    return accessory.save();
};

const getAll = async () => {
    return Accessory.find({}).lean();
};

const accessoryService = {
    create,
    getAll,

};

module.exports = accessoryService;
