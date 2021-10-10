const express = require('express');

const router = express.Router({ mergeParams: true });

const cubeService = require('../services/cubeService');


const getAttach = async (req, res) => {
    let cube = await cubeService.getById(req.params.cubeId);

    res.render('cube/accessory/attach', { ...cube });
};

router.get('/attach', getAttach);

module.exports = router;