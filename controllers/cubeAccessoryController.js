const express = require('express');

const router = express.Router({ mergeParams: true });

const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');


const getAttach = async (req, res) => {
    let cube = await cubeService.getById(req.params.cubeId);

    let accessories = await accessoryService.getAll();

    res.render('cube/accessory/attach', { cube, accessories });
};

router.get('/attach', getAttach);

module.exports = router;