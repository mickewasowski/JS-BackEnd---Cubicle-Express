const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');


const getAll = () => Cube.find({}).lean();

const getSearchCubes = (text, from, to) => {
    let result = getAll();

    let fromNum = Number(from);
    let toNum = Number(to);

    if (text) {
        console.log(text);
        result = result.filter(x => x.name.toLowerCase().includes(text.toLowerCase()));
    }

    if (fromNum) {
        console.log(fromNum);
        result = result.filter(x => Number(x.difficulty) >= fromNum);
    }

    if (toNum) {
        console.log(toNum);
        result = result.filter(x => Number(x.difficulty) <= toNum);
    }

    return result;
};

const create = (name, description, imageUrl, difficulty) => {
    let cube = new Cube({
        name,
        description,
        imageUrl,
        difficulty,
    });

    return cube.save();
};

const getById = (cubeId) => Cube.findById(cubeId).lean();

const attachAccessory = async (cubeId, accessoryId) => {
    let cube = await Cube.findById(cubeId);
    let accessory = await Accessory.findById(accessoryId);

    cube.accessories.push(accessory);

    return cube.save();
};

const cubeService = {
    attachAccessory,
    getAll,
    getById,
    getSearchCubes,
    create,
};

module.exports = cubeService;