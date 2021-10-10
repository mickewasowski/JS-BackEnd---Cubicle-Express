const express = require('express');

const router = express.Router({ mergeParams: true });

const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');


const getAttach = async (req, res) => {
    let cube = await cubeService.getById(req.params.cubeId);

    let accessories = await accessoryService.getAll();

    res.render('cube/accessory/attach', { cube, accessories });
};

const postAttach = async (req, res) => {
    let cubeId = req.params.cubeId;
    await cubeService.attachAccessory(cubeId, req.body.accessory);

    res.redirect(`/cube/${cubeId}`);
};

router.get('/attach', getAttach);
router.post('/attach', postAttach);

module.exports = router;