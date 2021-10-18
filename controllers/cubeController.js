const express = require('express');

const cubeService = require('../services/cubeService');
const cubeAccessoryController = require('./cubeAccessoryController');

const { isAuth } = require('../middlewares/authMiddleware');
const { isOwnCube } = require('../middlewares/cubeAuthMiddleware');

const router = express.Router();

const getCreateCube = (req, res) => {

    res.render('./cube/create');
};

const postCreateCube = async (req, res) => {

    let { name, description, imageUrl, difficulty } = req.body;

    try {
        await cubeService.create(name, description, imageUrl, difficulty, req.user._id);
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
    res.render('cube/edit', req.cube);
};

const postEditCubePage = async (req, res) => {
    let { name, description, imageUrl, difficulty } = req.body;

    await cubeService.updateCube(req.params.cubeId, { name, description, imageUrl, difficulty });

    return res.redirect(`/cube/${req.params.cubeId}`);
};

const getDeleteCubePage = async (req, res) => {
    res.render('cube/delete', req.cube);
};

const postDeleteCubePage = async (req, res) => {
    await cubeService.deleteCube(req.params.cubeId);

    res.redirect('/');
};

router.get('/create', isAuth, getCreateCube);
router.post('/create', isAuth, postCreateCube);

router.get('/:cubeId', cubeDetails);
router.use('/:cubeId/accessory', cubeAccessoryController)

router.get('/:cubeId/edit', isAuth, isOwnCube, getEditCubePage);
router.post('/:cubeId/edit', isAuth, isOwnCube, postEditCubePage);

router.get('/:cubeId/delete', isAuth, isOwnCube, getDeleteCubePage);
router.post('/:cubeId/delete', isAuth, isOwnCube, postDeleteCubePage);


module.exports = router;