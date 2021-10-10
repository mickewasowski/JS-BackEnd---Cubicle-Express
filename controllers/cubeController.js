const express = require('express');

const cubeService = require('../services/cubeService');
const cubeAccessoryController = require('./cubeAccessoryController');

const router = express.Router();

const getCreateCube = (req, res) => {
    res.render('./cube/create');
};

const postCreateCube = async (req, res) => {
    let { name, description, imageUrl, difficulty } = req.body;

    try {
        await cubeService.create(name, description, imageUrl, difficulty);
        res.redirect('/');

    } catch (err) {
        res.status(400).send(err.message).end();
    }
}

const cubeDetails = async (req, res) => {
    let cube = await cubeService.getById(req.params.cubeId);

    res.render('./cube/details', cube);
};



router.get('/create', getCreateCube);
router.post('/create', postCreateCube);
router.get('/:cubeId', cubeDetails);
router.use('/:cubeId/accessory', cubeAccessoryController)


module.exports = router;