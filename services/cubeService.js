const Cube = require('../models/Cube');


const getAll = () => Cube.cubes

const create = (name, description, imageUrl, difficulty) => {
    let cube = new Cube(name, description, imageUrl, difficulty);

    Cube.add(cube);
};

const getById = (cubeId) => Cube.cubes.find(x => x.id == cubeId);

const cubeService = {
    getAll,
    getById,
    create,
};

module.exports = cubeService;