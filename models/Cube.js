class Cube {
    static cubes = [{
        name: 'Rubik',
        description: '3x3 rubik standart',
        imageURL: 'https://static.scientificamerican.com/sciam/cache/file/76CA6AF7-D83E-481F-B27BED55698AEB36_source.jpg',
        difficulty: '3'
    }];

    constructor(name, description, imageURL, difficulty) {
        this.name = name;
        this.description = description;
        this.imageURL = imageURL;
        this.difficulty = difficulty;
    }

    static getAll() {
        return Cube.cubes.slice();
    }

    static add(cube) {
        Cube.cubes.push(cube);
    }
}

module.exports = Cube;