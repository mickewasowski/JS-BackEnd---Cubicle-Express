const express = require('express');

const accessoryService = require('../services/accessoryService');

const router = express.Router();

const getCreateAccessory = (req, res) => {
    res.render('../views/accessory/create.hbs');
};

const postCreateAccessory = async (req, res) => {
    let { name, description, imageUrl } = req.body;

    try {
        await accessoryService.create(name, description, imageUrl);
        res.redirect('/');

    } catch (err) {
        res.status(400).send(err.message).end();
    }

};

router.get('/create', getCreateAccessory);
router.post('/create', postCreateAccessory);

module.exports = router;