const uniqid = require('uniqid');

class Cube {
    static #cubes = [{
        id: 'jhdfkgeriuew',
        name: 'Rubik',
        description: '3x3 rubik standart',
        imageURL: 'https://static.scientificamerican.com/sciam/cache/file/76CA6AF7-D83E-481F-B27BED55698AEB36_source.jpg',
        difficulty: '3'
    },
    {
        id: 'ddqj63bj8ku2zvejd',
        name: 'Mirror cube',
        description: 'mirror cube',
        imageURL: 'https://rukminim1.flixcart.com/image/416/416/k20r8nk0/puzzle/r/4/p/1-3x3-silver-mirror-cube-shengshou-original-imafhgmzdh8dfetk.jpeg?q=70',
        difficulty: '4'
    }];

    constructor(name, description, imageURL, difficulty) {
        this.id = uniqid();
        this.name = name;
        this.description = description;
        this.imageURL = imageURL;
        this.difficulty = difficulty;
    }

    static get cubes() {
        return Cube.#cubes.slice();
    }

    static add(cube) {
        Cube.#cubes.push(cube);
    }
}

module.exports = Cube;