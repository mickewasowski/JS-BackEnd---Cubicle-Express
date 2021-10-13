const express = require('express');

const cubeService = require('../services/cubeService');
const cubeAccessoryController = require('./cubeAccessoryController');

const router = express.Router();

const getCreateCube = (req, res) => {
    if (!req.user) {
        return res.redirect('/user/login');
    }

    res.render('./cube/create');
};

const postCreateCube = async (req, res) => {
    if (!req.user) {
        return res.redirect('/user/login');
    }

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

    res.render('./cube/details', { cube });
};

const getEditCubePage = async (req, res) => {
    if (!req.user) {
        return res.redirect('/user/login');
    }

    let cube = await cubeService.getById(req.params.cubeId);

    res.render('cube/edit', { cube });
};

const postEditCubePage = async (req, res) => {

};

const getDeleteCubePage = async (req, res) => {
    if (!req.user) {
        return res.redirect('/user/login');
    }

    let cube = await cubeService.getById(req.params.cubeId);

    res.render('cube/delete', { cube });
};

const postDeleteCubePage = async (req, res) => {
    await cubeService.deleteCube(req.params.cubeId);

    res.redirect('/');
};

router.get('/create', getCreateCube);
router.post('/create', postCreateCube);

router.get('/:cubeId', cubeDetails);
router.use('/:cubeId/accessory', cubeAccessoryController)

router.get('/:cubeId/edit', getEditCubePage);
router.post('/:cubeId/edit', postEditCubePage);

router.get('/:cubeId/delete', getDeleteCubePage);
router.post('/:cubeId/delete', postDeleteCubePage);


module.exports = router;