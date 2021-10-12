const express = require('express');
const userService = require('../services/userService');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', (req, res) => {
    console.log(req.body);

    res.redirect('login');
});

router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', async (req, res) => {
    let { username, password, repeatPassword } = req.body;

    let response = await userService.register(username, password, repeatPassword);

    if (typeof response == 'object') {
        res.redirect('login');
    } else {
        res.redirect('register');
    }

});

module.exports = router;