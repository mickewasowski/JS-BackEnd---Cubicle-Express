const Cube = require('../models/Cube');


const getAll = () => Cube.cubes;

const getSearchCubes = (name, from, to) => {
    result = Cube.cubes;

    if (name) {
        result = result.filter(x => x.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
    }
    if (from != undefined) {
        result = result.filter(x => Number(x.difficulty) >= from);
    }

    if (to != undefined) {
        result = result.filter(x => Number(x.difficulty) <= to);
    }
    return result;
};

const create = (name, description, imageUrl, difficulty) => {
    let cube = new Cube(name, description, imageUrl, difficulty);

    Cube.add(cube);
};

const getById = (cubeId) => Cube.cubes.find(x => x.id == cubeId);

const cubeService = {
    getAll,
    getById,
    getSearchCubes,
    create,
};

module.exports = cubeService;