const express = require('express');
const cubeService = require('../services/cubeService');

const router = express.Router();

const home = (req, res) => {

    let cubes = cubeService.getAll();

    res.render('index', {
        cubes
    });
};

const about = (req, res) => {
    res.render('about');
};

const search = (req, res) => {

    let name = req.query.search;
    let from = Number(req.query.from);
    let to = Number(req.query.to);

    let cubes = cubeService.getSearchCubes(name, from, to);

    console.log(cubes);

    res.render('index', { cubes });
};


router.get('/', home);
router.get('/about', about);
router.get('/search', search);

module.exports = router;