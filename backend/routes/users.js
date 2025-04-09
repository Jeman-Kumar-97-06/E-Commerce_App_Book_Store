const express = require('express');
const router  = express.Router();

const {
    signupUser,
    loginUser
}             = require('../controllers/usersControllers');

router.post('/login',loginUser);

router.post('/signup',signupUser);

module.exports = router;