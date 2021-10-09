const express = require('express');
const cubeService = require('../services/cubeService');

const router = express.Router();

const home = async (req, res) => {

    let cubes = await cubeService.getAll();

    cubes.forEach(x => x._id.toString());

    console.log(cubes);

    res.render('index', {
        cubes
    });
};

const about = (req, res) => {
    res.render('about');
};

const search = (req, res) => {

    let searchName = req.query.search;
    let from = req.query.from;
    let to = req.query.to;

    let cubes = cubeService.getSearchCubes(searchName, from, to);

    console.log(cubes);

    res.render('index', {
        title: 'Search',
        searchName,
        from,
        to,
        cubes
    });
};


router.get('/', home);
router.get('/about', about);
router.get('/search', search);

module.exports = router;