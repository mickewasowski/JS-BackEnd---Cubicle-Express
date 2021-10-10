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

const getRemaining = async (accessoryIds) => {
    //return Accessory.find({ _id: { $nin: accessoryIds } }).lean();

    return Accessory.find().where('_id').nin(accessoryIds).lean();
};

const accessoryService = {
    create,
    getAll,
    getRemaining,

};

module.exports = accessoryService;
