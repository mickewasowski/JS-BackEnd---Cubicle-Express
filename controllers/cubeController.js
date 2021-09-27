const express = require('express');

const cubeService = require('../services/cubeService');

const router = express.Router();

const getCreateCube = (req, res) => {
    let cubes = cubeService.getAll();

    console.log(cubes);

    res.render('create');
};

const postCreateCube = (req, res) => {
    let { name, description, imageUrl, difficulty } = req.body;

    cubeService.create(name, description, imageUrl, difficulty);

    res.redirect('/');
};

const cubeDetails = (req, res) => {
    let cube = cubeService.getById(req.params.cubeId);

    res.render('details', cube);
};

router.get('/create', getCreateCube);
router.post('/create', postCreateCube);
router.get('/:cubeId', cubeDetails);


module.exports = router;