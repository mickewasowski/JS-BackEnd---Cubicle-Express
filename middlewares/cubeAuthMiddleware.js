const cubeService = require('../services/cubeService');

exports.isOwnCube = async function (req, res, next) {
    let cube = await cubeService.getById(req.params.cubeId);

    if (cube.creator == req.user._id) {
        req.cube = cube;

        next();
    } else {
        next('You are not authorized to edit this cube!');
    }
}