const express = require('express');
const userService = require('../services/userService');

const { jwtTokenName } = require('../constants');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    let user = await userService.login(username, password);

    if (!user) {
        return res.redirect('/404');
    }

    let token = await userService.createToken(user);

    res.cookie(jwtTokenName, token, {
        httpOnly: true,
    });

    res.redirect('/');
});

router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', async (req, res) => {
    //previous registration validation => before adding the virtual method in the user model
    // let { username, password, repeatPassword } = req.body;

    // let response = await userService.register(username, password, repeatPassword);

    // if (typeof response == 'object') {
    //     res.redirect('login');
    // } else {
    //     res.redirect('register');
    // }

    try {
        let { username, password, repeatPassword } = req.body;

        await userService.register(username, password, repeatPassword);

        res.redirect('login');
    }
    catch (error) {
        //res.status(400).send(error.message);

        res.status(400).render('user/register', { error: error.message });
    }

});

module.exports = router;